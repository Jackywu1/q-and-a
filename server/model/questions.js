const db = require('../db');

const collectQuestions = require('../helpers/collectQuestions.js');
const collectAnswers = require('../helpers/collectAnswers.js');
const collectPhotos = require('../helpers/collectPhotos.js');

module.exports = {
  retrieve(product_id, page = 1, count = 5, res) {
    // query to get questions with answers
    const qaQuery = `
      SELECT
        q.question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness, q.reported,
        a.answer_id, a.body, a.date, a.answerer_name, a.helpfulness
      FROM
        Questions AS q INNER JOIN Answers AS a ON q.question_id = a.questions_id
      WHERE
        q.product_id = ${product_id}
      LIMIT ${count}
    `;

    db.query(qaQuery, (err, questionData) => {
      if (err) res.status(404).send(err);

      const results = collectQuestions(questionData);
      collectAnswers(results, questionData);

      // query to get answers with photos
      const apQuery = `
        SELECT
          q.question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness, q.reported,
          a.answer_id, a.body, a.date, a.answerer_name, a.helpfulness,
          p.photo_url
        FROM
          Questions AS q INNER JOIN Answers AS a ON q.question_id = a.questions_id AND q.product_id = ${product_id}
          INNER JOIN Photos AS p ON a.answer_id = p.answer_id
      `;

      db.query(apQuery, (err, photoData) => {
        if (err) res.status(404).send(err);

        collectPhotos(results, photoData);
        results.forEach((question) => {
          question.reported === 0 ? question.reported = false : question.reported = true;
        });

        res.status(200).send({
          product_id,
          results,
        });
      });
    });
  },

  insert(data, res) {
    const { body, name, email, product_id } = data;

    let query = `INSERT INTO Questions (product_id, body, asker_name, asker_email) `;
    query += `VALUES (${product_id}, '${body}', '${name}', '${email}')`;

    db.query(query, (err, data) => {
      err ? res.status(404).send(err) : res.status(201).end();
    });
  },

  increment(question_id, res) {
    const query = `UPDATE Questions SET helpful = helpful + 1 WHERE id = ${question_id}`;

    db.query(query, (err, success) => {
      err ? res.status(404).send(err) : res.status(204).send(success);
    });
  },

  update(question_id, res) {
    const query = `UPDATE Questions SET reported = 1 WHERE id = ${question_id}`;

    db.query(query, (err, success) => {
      err ? res.status(404).send(err) : res.status(204).send(success);
    });
  }
};
