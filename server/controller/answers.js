const cache = require('../cache');
const { retrieve, insert, increment, update } = require('../model/answers.js');

module.exports = {
  getAnswers(req, res) {
    const { question_id } = req.params;
    const { page, count } = req.query;

    const data = cache.get(`question_id ${question_id}`);
    data ? res.send(data) : retrieve(question_id, page, count, res);
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
