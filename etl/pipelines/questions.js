const fs = require('fs');
const csv = require('fast-csv');
const db = require('../../server/db');

const { parseString, parseDate, parseNum, parseBoolean } = require('./helpers');

let csvStream = csv.parseFile('../data/raw/questions.csv', {
  headers: true,
  }).transform(row => ({
      ...row,
      question_body: parseString(row.question),
      question_date: parseDate(row.date),
      asker_name: parseString(row.asker_name),
      question_helpfulness: parseNum(row.helpful),
      reported: parseBoolean(reported),
      product_id: parseInteger(row.product_id),
  }))
  .on("data", (row) => {
      const query = `INSERT INTO reviews SET ?`;
      db.query(query, row, (err) => {
          if (err) {
              throw err
          }
      })
  }).on("end", (count) => {
      db.end();
  }).on("error", err => {
      console.log(err);
  });
