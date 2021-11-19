import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import app from '../src/app.js';
import '../src/setup.js';
import userFactory from './factory/userFactory.js';
import connection from '../src/factoryes/dbConfig.js';
import signUpFactory from '../src/factoryes/dbFactoryes/signUpFactory.js';

beforeAll(async () => {
  await connection.query('DELETE FROM address;DELETE FROM users;');
});

afterAll(async () => {
  await connection.query('DELETE FROM address;DELETE FROM users;');
});

describe('POST /validate-token', () => {
  const user = userFactory();
  let token;

  beforeAll(async () => {
    await signUpFactory({ ...user, userPassword: bcrypt.hashSync(user.userPassword, 10) });
    const dbUser = await connection.query('SELECT * FROM users WHERE email=($1);', [user.userEmail]);
    token = jwt.sign({ id: dbUser.rows[0].id }, process.env.JWT_SECRET);
  });

  it('return 200 for valid token', async () => {
    const result = await supertest(app).post('/validate-token').set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(200);
  });

  it('return 401 for invalid token', async () => {
    const result = await supertest(app).post('/validate-token').set('Authorization', 'Bearer asdfasdf');
    expect(result.status).toEqual(401);
  });
});
