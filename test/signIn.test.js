import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../src/app.js';
import '../src/setup.js';
import userFactory from './factory/userFactory.js';
import connection from '../src/factoryes/dbConfig.js';
import signUpFactory from '../src/factoryes/dbFactoryes/signUpFactory.js';

beforeAll(async () => {
  await connection.query('DELETE FROM users');
});

afterAll(async () => {
  await connection.query('DELETE FROM users');
});

describe('POST /sign-in', () => {
  const user = userFactory();
  beforeAll(async () => {
    await signUpFactory({ ...user, userPassword: bcrypt.hashSync(user.userPassword, 10) });
  });

  it('returns 200 for valid entries', async () => {
    const result = await supertest(app).post('/sign-in').send({ userEmail: user.userEmail, userPassword: user.userPassword });
    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('userName', user.userName);
    expect(result.body).toHaveProperty('userToken');
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
