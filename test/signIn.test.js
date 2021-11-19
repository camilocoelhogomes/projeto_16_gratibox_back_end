import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../src/app.js';
import '../src/setup.js';
import userFactory from './factory/userFactory.js';
import signUpFactory from '../src/factoryes/dbFactoryes/signUpFactory.js';
import deleteDb from './functions/delete.js';
import connection from '../src/factoryes/dbConfig.js';
import addressFactory from './factory/addressFactory.js';
import addressDbFactory from '../src/factoryes/dbFactoryes/addressDbFactory.js';
import signatureDbFactory from '../src/factoryes/dbFactoryes/signatureDbFactory.js';
import updateUserCompleteName from '../src/factoryes/dbFactoryes/updateUserCompleteName.js';

beforeAll(async () => {
  await deleteDb;
});

afterAll(async () => {
  await deleteDb;
});

describe('POST /sign-in', () => {
  const user = userFactory();
  const userWithSignature = userFactory();
  const address = addressFactory();
  const signature = {
    userDeliveryDateId: Math.ceil(Math.random() * 6),
    userProductOptionsId: Math.ceil(Math.random() * 3),
  };

  beforeAll(async () => {
    await signUpFactory({ ...user, userPassword: bcrypt.hashSync(user.userPassword, 10) });
    // eslint-disable-next-line max-len
    await signUpFactory({ ...userWithSignature, userPassword: bcrypt.hashSync(userWithSignature.userPassword, 10) });
    const dbUser = await connection.query('SELECT * FROM users WHERE email=($1);', [userWithSignature.userEmail]);
    await updateUserCompleteName({ completeName: address.completeName, userId: dbUser.rows[0].id });
    await addressDbFactory({ ...address, userId: dbUser.rows[0].id });
    await signatureDbFactory({ ...signature, userId: dbUser.rows[0].id });
  });

  it('returns 200 for valid entries', async () => {
    const result = await supertest(app).post('/sign-in').send({ userEmail: user.userEmail, userPassword: user.userPassword });
    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('userName', user.userName);
    expect(result.body).toHaveProperty('userToken');
    expect(result.body).toHaveProperty('userPlan');
    expect(result.body).toHaveProperty('userPlanSignatureDate');
    expect(result.body).toHaveProperty('userAddress');
  });

  it('returns 200 for valid with signature', async () => {
    const result = await supertest(app).post('/sign-in').send({ userEmail: userWithSignature.userEmail, userPassword: userWithSignature.userPassword });
    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('userName', userWithSignature.userName);
    expect(result.body).toHaveProperty('userToken');
    expect(result.body).toHaveProperty('userPlan');
    expect(result.body).toHaveProperty('userPlanSignatureDate');
    expect(result.body).toHaveProperty('userAddress');
  });

  it('returns 401 for invalid body', async () => {
    const result = await supertest(app).post('/sign-in').send({ userEail: user.userEmail, userPassword: user.userPassword });
    expect(result.status).toEqual(401);
  });

  it('returns 401 for wrong password', async () => {
    const result = await supertest(app).post('/sign-in').send({ userEmail: user.userEmail, userPassword: 'abc*123ABC' });
    expect(result.status).toEqual(401);
  });
});
