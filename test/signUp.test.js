import supertest from 'supertest';
import app from '../src/app.js';
import '../src/setup.js';
import connection from '../src/factoryes/dbConfig';

describe('POST /sign-up', () => {
  it('returns 201 for valid entreis', async () => {
    const initialUsers = await connection.query('SELECT * FROM users;');
    const result = await supertest(app).post('/sign-up');
    const finalUsers = await connection.query('SELECT * FROM users;');
    expect(result.status).toEqual(201);
    expect(finalUsers.rowCount - initialUsers.rowCount).toEqual(1);
  });
});
