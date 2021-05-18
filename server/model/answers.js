const db = require('../db');
const cache = require('../cache');

const collectPhotos = require('../helpers/collectPhotos.js');

module.exports = {
  retrieve(question_id, page = 1, count = 5, res) {
    // query to get answers
    const answerQuery = `
      SELECT
        answer_id, body, date, answerer_name, helpfulness
      FROM
        Answers
      WHERE
        questions_id = ${question_id}
      LIMIT ${count}
    `;

    db.query(answerQuery, (err, answersData) => {
      if (err) res.status(404).send(err);

      const results = answersData;
      results.forEach((answer) => {
        answer.photos = [];
      });

      // query to get photos
      const photoQuery = `
        SELECT
          p.answer_id, p.photo_url
        FROM
          Answers AS a INNER JOIN Photos AS p ON a.answer_id = p.answer_id
        WHERE
          a.questions_id = ${question_id}
      `;

      db.query(photoQuery, (err, photoData) => {
        if (err) res.status(404).send(err);

        photoData.forEach((photo) => {
          const { answer_id, photo_url } = photo;

          results.forEach((answer, index) => {
            if (answer.answer_id === answer_id) {
              results[index].photos.push(photo_url);
            }
          });
        });

        const resultData = {
          question: question_id,
          page,
          count,
          results,
        }

        cache.set(`question_id ${question_id}`, resultData);
        res.status(200).send(resultData);
      });
    });
  },

  insert(data, res) {
    const { body, name, email, photos } = data;

    let answerQuery = `INSERT INTO Answers (answer_body, answerer_name, answerer_email) `;
    answerQuery += `VALUES ('${body}', '${name}', '${email}')`;

    db.query(answerQuery, (err, data) => {
      const { insertId } = data;

      photos.forEach((photo) => {
        const photoQuery = `INSERT INTO Photos (answer_id, photo_url) VALUES (${insertId}, '${photo}')`;

        db.query(photoQuery, (err, success) => {
          err ? res.status(400).send(err) : null;
        });
      });

      res.status(201).send(data);
    });
  },

  increment(answer_id, res) {
    const query = `UPDATE Answers SET helpful = helpful + 1 WHERE id = ${answer_id}`;

    db.query(query, (err, success) => {
      err ? res.status(400).send(err) : res.status(204).send(success);
    });
  },

  update(answer_id, res) {
    const query = `UPDATE Answers SET reported = 1 WHERE id = ${answer_id}`;

    db.query(query, (err, success) => {
      err ? res.status(400).send(err) : res.status(204).send('testing');
    });
  },
}
