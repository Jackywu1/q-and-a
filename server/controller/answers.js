module.exports = {
  getAnswers(req, res) {
    const { question_id } = req.params;
    const { page, count } = req.query;

    const inputData = {
      question_id,
      page,
      count,
    }

    res.send(inputData);
  },

  postAnswer(req, res) {
    res.send(req.body);
  },
}
