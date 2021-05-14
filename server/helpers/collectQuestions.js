module.exports = collectQuestions = (data) => {
  const ids = [];
  const uniqueQuestions = [];

  data.forEach((question) => {
    const { question_id, question_body, question_date, asker_name, question_helpfulness, reported } = question;

    if (!ids.includes(question_id)) {
      uniqueQuestions.push({
        question_id,
        question_body,
        question_date,
        asker_name,
        question_helpfulness,
        reported,
        answers: {},
      });

      ids.push(question_id);
    }
  });

  return uniqueQuestions;
};
