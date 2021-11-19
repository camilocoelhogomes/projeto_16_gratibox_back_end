import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import app from '../src/app.js';
import '../src/setup.js';
import connection from '../src/factoryes/dbConfig.js';
import userFactory from './factory/userFactory.js';
import signUpFactory from '../src/factoryes/dbFactoryes/signUpFactory.js';

beforeAll(async () => {
  await connection.query('DELETE FROM address;DELETE FROM users;');
});

afterAll(async () => {
  await connection.query('DELETE FROM address;DELETE FROM users;');
});

describe('POST /new-signature', () => {
  const user = userFactory();
  let token;
  const newSignature = {
    userDeliveryDateId: Math.ceil(Math.random() * 6),
    userProductOptionsId: Math.ceil(Math.random() * 3),
    userAddress: {},
  };
  beforeAll(async () => {
    await signUpFactory({ ...user, userPassword: bcrypt.hashSync(user.userPassword, 10) });
    const dbUser = await connection.query('SELECT * FROM users WHERE email=($1);', [user.userEmail]);
    token = jwt.sign({ id: dbUser.rows[0].id }, process.env.JWT_SECRET);
  });

  it('return 201 for new signature', async () => {
    const initialSignatures = await connection.query('SELECT * FROM signature;');
    const result = await supertest(app).post('/new-signature').set('Authorization', `Bearer ${token}`).send(newSignature);
    const finalSignatures = await connection.query('SELECT * FROM signature;');
    expect(result.status).toEqual(201);
    expect(initialSignatures.rowCount - finalSignatures.rowCount).toEqual(1);
  });
});
