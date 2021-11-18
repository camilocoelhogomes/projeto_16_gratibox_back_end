import supertest from 'supertest';
import app from '../src/app.js';
import '../src/setup.js';

describe('GET /is-live', () => {
  it('returns 200', async () => {
    const result = await supertest(app).get('/is-live');
    expect(result.status).toEqual(200);
  });
});
