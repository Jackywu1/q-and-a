const db = require('../db');

module.exports = {
  retrieve(product_id, page, count, res) {
    const query = `SELECT * FROM Questions WHERE product_id = ${product_id} AND reported = 0 LIMIT ${count}`;

    db.query(query, (err, data) => {
      err ? res.status(404).send(err) : res.status(200).send(data);
    });
  },

  insert(data, res) {
    const { body, name, email, product_id } = data;

    let query = `INSERT INTO Questions (product_id, body, asker_name, asker_email) `;
    query += `VALUES (${product_id}, '${body}', '${name}', '${email}')`;

    db.query(query, (err, data) => {
      const { insertId } = data;
      console.log(`inserted as id ${insertId}`);

      db.query(`SELECT LAST_INSERT_ID()`, (err, id) => {
        err ? console.log('error') : console.log(`id: `, id);
      });

      err ? res.status(404).send(err) : res.status(201).send(data);
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
}
