const db = require('../db');

module.exports = {
  retrieve(question_id, page = 1, count = 5, res) {
    const query = `SELECT * FROM Answers WHERE questions_id = ${question_id} && reported = 0 LIMIT ${count}`;

    db.query(query, (err, data) => {
      err ? res.status(404).send(err) : res.status(200).send(data);
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
