const { retrieve, insert, increment, update } = require('../model/answers.js');

module.exports = {
  getAnswers(req, res) {
    const { question_id } = req.params;
    let { page, count } = req.query;

    page = page || 1;
    count = count || 5;

    retrieve(question_id, page, count, res);
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
