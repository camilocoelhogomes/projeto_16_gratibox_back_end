import supertest from 'supertest';
import app from '../src/app.js';
import '../src/setup.js';

describe('GET /plans', () => {
  it('return 200 for valid plans', async () => {
    const result = await supertest(app).get('/plans');
    expect(result.status).toEqual(200);
    expect(result.body).toHaveLength(2);
  });
});
