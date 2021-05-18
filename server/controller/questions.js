const cache = require('../cache');
const { retrieve, insert, increment, update } = require('../model/questions.js');

module.exports = {
  getQuestions(req, res) {
    const { product_id, page, count } = req.query;

    const data = cache.get(`product_id ${product_id}`);
    data ? res.send(data) : retrieve(product_id, page, count, res);
  },

  postQuestion(req, res) {
    insert(req.body, res);
  },

  putQHelpful(req, res) {
    increment(req.params.question_id, res);
  },

  putQReport(req, res) {
    update(req.params.question_id, res);
  },
}
