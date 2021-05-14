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
    const response = await request.get('/qa/questions?product_id=1');

    expect(response.status).toBe(200);

    const { product_id, results } = response.body;
    const { question_id, question_body, question_date, asker_name, question_helpfulness, reported } = results[0];

    expect(product_id).toBe('1');
    expect(Array.isArray(response.body.results)).toBe(true);

    expect(typeof question_id).toBe('number');
    expect(typeof question_body).toBe('string');
    expect(typeof question_date).toBe('string');
    expect(typeof asker_name).toBe('string');
    expect(typeof question_helpfulness).toBe('number');
    expect(typeof reported).toBe('boolean');
  });

  test('POST /qa/questions', async () => {
    // const response = await request.post('/qa/questions').send(testData);

    // expect(response.status).toBe(201);

    // await db.query(`DELETE FROM Questions WHERE product_id = 1234567890`, (err, success) => {});
  });
});
