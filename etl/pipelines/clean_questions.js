const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const questionInput = path.join(__dirname, '..', 'data', 'raw', 'questions.csv');
const questionOutput = path.join(__dirname, '..', 'data', 'cleaned', 'questions_cleaned.csv');

let stream = fs.createReadStream(questionInput);
let csvStream = fastcsv
  .parse()
  .on('data', data => {
    if (data.length === 8) {
      let [id, product_id, body, date_written, asker_name, asker_email, reported, helpful] = data;

      if (isNaN(parseInt(id)) || isNaN(parseInt(helpful)) || isNaN(parseInt(reported)) || isNaN(parseInt(product_id))) {
        return;
      }

      body = body.replace(',', '');
      date_written = date_written.replace(',', '');
      asker_name = asker_name.replace(',', '');

      let question = [parseInt(id), body, date_written, asker_name, parseInt(helpful), parseInt(reported), parseInt(product_id)];

      fs.appendFile(questionOutput, question.toString() + '\n', err => {
        if (err) {
          console.log(err);
        }
      });
    }
  })
  .on('end', () => {
    console.log('done writing');
  });

stream.pipe(csvStream);
