const { retrieve, insert, increment, update } = require('../model/answers.js');

module.exports = {
  getAnswers(req, res) {
    retrieve(req.params.question_id, req.query.page, req.query.count, res);
  },

  postAnswer(req, res) {
    insert(req.body, res);
  },

  putAHelpful(req, res) {
    increment(req.params.answer_id, res);
  },

  putAReport(req, res) {
    update(req.params.answer_id, res);
  },
}
