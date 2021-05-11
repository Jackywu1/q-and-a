const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const db = require('../../server/db');
const questionOutput = path.join(__dirname, '..', 'data', 'cleaned', 'questions_cleaned.csv');

let questionData = [];

let stream = fs.createReadStream(questionOutput);
let csvStream = fastcsv
  .parse()
  .on('data', data => {
    // const [id, product_id, body, date_written, asker_name, asker_email, reported, helpful] = data;
    // const question = [parseInt(id), body.replace(',', ''), date_written.replace(',', ''), asker_name.replace(',', ''), parseInt(helpful), parseInt(reported), parseInt(product_id)];

    // id,product_id,body,date_written,asker_name,asker_email,reported,helpful

    questionData.push(question);
  })
  .on('end', () => {
    let query = `INSERT INTO Questions (id, question_body, question_date, asker_name, question_helpfulness, reported, product_id) VALUES ?`;

    console.log(questionData.length);
    db.query(query, [questionData], (err) => {
      err ? console.log(err) : console.log('success adding');
    });
    console.log('done adding');
  });

stream.pipe(csvStream);
