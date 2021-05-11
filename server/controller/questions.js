module.exports = {
  getQuestions(req, res) {
    const { product_id, page, count } = req.query;
    const inputData = {
      product_id,
      page,
      count,
    };

    res.send('test');
  },

  postQuestion(req, res) {
    res.send(req.body);
  },


}
