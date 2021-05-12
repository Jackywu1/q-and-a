const app = require('../server');
const db = require('../server/db');

const supertest = require('supertest');
const request = supertest(app);

describe('Questions', () => {
  const testData = {
    body: 'my example body paragraph text',
    name: 'first_name last_name',
    email: 'my_example@email.com',
    product_id: 1234567890,
  };

  test('GET /qa/questions', async () => {
    const response = await request.get('/qa/questions?product_id=23152');

    expect(response.status).toBe(200);
    expect(response.body.length > 0).toBe(true);
  });

  test('POST /qa/questions', async () => {
    const response = await request.post('/qa/questions').send(testData);

    expect(response.status).toBe(201);

    await db.query(`DELETE FROM Questions WHERE product_id = 1234567890`, (err, success) => {});
  });
});
