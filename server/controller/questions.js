const { retrieve, insert, increment, update } = require('../model/questions.js');

module.exports = {
  getQuestions(req, res) {
    let { product_id, page, count } = req.query;

    page = page || 1;
    count = count || 5;

    retrieve(product_id, page, count, res);
  },

  postQuestion(req, res) {
    insert(req.body, res);
  },

  putHelpful(req, res) {
    increment(req.params.question_id, res);
  },

  putReport(req, res) {
    update(req.params.question_id, res);
  }
}
