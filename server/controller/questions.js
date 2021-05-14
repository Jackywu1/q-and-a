const { retrieve, insert, increment, update } = require('../model/questions.js');

module.exports = {
  getQuestions(req, res) {
    let { product_id, page, count } = req.query;

    retrieve(product_id, page, count, res);
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
