module.exports = collectAnswers = (results, data) => {
  data.forEach((answer) => {
    const { question_id, answer_id, body, date, answerer_name, helpfulness } = answer;

    results.forEach((question, index) => {
      if (question.question_id === question_id) {
        results[index].answers[answer_id] = {
          id: answer_id,
          body,
          date,
          answerer_name,
          helpfulness,
          photos: [],
        }
      }
    });
  });
};
