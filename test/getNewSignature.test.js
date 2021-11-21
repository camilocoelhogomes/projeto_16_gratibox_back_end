import supertest from 'supertest';
import app from '../src/app.js';
import '../src/setup.js';

describe('GET /new-signature', () => {
  it('return 200 for valid plans', async () => {
    const result = await supertest(app).get('/new-signature');
    expect(result.status).toEqual(200);
  });
});
