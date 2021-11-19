import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import app from '../src/app.js';
import '../src/setup.js';
import userFactory from './factory/userFactory.js';
import connection from '../src/factoryes/dbConfig.js';
import signUpFactory from '../src/factoryes/dbFactoryes/signUpFactory.js';
import addressFactory from './factory/addressFactory.js';
import deleteDb from './functions/delete.js';

beforeAll(async () => {
  await deleteDb;
});

afterAll(async () => {
  await deleteDb;
});

describe('/POST address', () => {
  const user = userFactory();
  let token;
  const address = addressFactory();
  beforeAll(async () => {
    await signUpFactory({ ...user, userPassword: bcrypt.hashSync(user.userPassword, 10) });
    const dbUser = await connection.query('SELECT * FROM users WHERE email=($1);', [user.userEmail]);
    token = jwt.sign({ id: dbUser.rows[0].id }, process.env.JWT_SECRET);
  });

  it('returns 200 for valid address', async () => {
    const initial = await connection.query('SELECT * FROM address;');
    const result = await supertest(app)
      .post('/validate-address')
      .set('Authorization', `Bearer ${token}`)
      .send({ userAddress: address });
    const final = await connection.query('SELECT * FROM address;');
    expect(result.status).toEqual(200);
    expect(final.rowCount - initial.rowCount).toEqual(1);
  });

  it('returns 409 for conflict address', async () => {
    const initial = await connection.query('SELECT * FROM address;');
    const result = await supertest(app)
      .post('/validate-address')
      .set('Authorization', `Bearer ${token}`)
      .send({ userAddress: address });
    const final = await connection.query('SELECT * FROM address;');
    expect(result.status).toEqual(409);
    expect(final.rowCount - initial.rowCount).toEqual(0);
  });
});
