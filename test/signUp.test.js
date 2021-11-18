import supertest from 'supertest';
import app from '../src/app.js';
import '../src/setup.js';
import connection from '../src/factoryes/dbConfig';
import userFactory from './factory/userFactory.js';

describe('POST /sign-up', () => {
  const newUser = userFactory();

  it('returns 201 for valid entreis', async () => {
    const initialUsers = await connection.query('SELECT * FROM users;');
    const result = await supertest(app).post('/sign-up').send({ ...newUser, userConfirmPassword: newUser.userPassword });
    const finalUsers = await connection.query('SELECT * FROM users;');
    expect(result.status).toEqual(201);
    expect(finalUsers.rowCount - initialUsers.rowCount).toEqual(1);
  });

  it('returns 409 for repeated email', async () => {
    const initialUsers = await connection.query('SELECT * FROM users;');
    const result = await supertest(app).post('/sign-up').send({ ...newUser, userConfirmPassword: newUser.userPassword });
    const finalUsers = await connection.query('SELECT * FROM users;');
    expect(result.status).toEqual(409);
    expect(finalUsers.rowCount - initialUsers.rowCount).toEqual(0);
  });

  it('returns 400 for invalid body email', async () => {
    const initialUsers = await connection.query('SELECT * FROM users;');
    const result = await supertest(app).post('/sign-up').send({ ...newUser });
    const finalUsers = await connection.query('SELECT * FROM users;');
    expect(result.status).toEqual(400);
    expect(finalUsers.rowCount - initialUsers.rowCount).toEqual(0);
  });
});
