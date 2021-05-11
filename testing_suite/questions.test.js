const request = require('supertest');

const app = require('../server');
const testPort = 3001;

test('GET /qa/questions', async () => {
  // await request(app)
  //   .get('/qa/questions?product_id=12345&page=2&count=10')
  //   .expect(200)
  //   .then((response) => {
  //     // check query parameters
  //     expect(response.text).toBe('test');
  //   });

  await request(app)
  .get('/qa/questions')
  .query({product_id: 12345, page: 10, count: 2})
  .expect(200)
  .then((response) => {
    // check query parameters
  });
});
