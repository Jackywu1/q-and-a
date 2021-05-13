const fs = require('fs');
const csv = require('fast-csv');
const db = require('../../server/db');

// const { parseString, parseDate, parseNum, parseBoolean } = require('./helpers');

const parseDate = (date) => {
  // parse number from string
  // if the number is valid date, create Date object from number
  // else create Date object from string
  // return the date

  const dateAsInteger = parseInt(date);
  const formattedDate = isNaN(dateAsInteger) ? new Date(date) : new Date(dateAsInteger);
  // formattedDate = formattedDate.replace('T', ' ').replace('Z', '');
  return formattedDate.toString() === "Invalid Date" ? null : formattedDate;
};

let csvStream = csv.parseFile('etl/data/raw/questions.csv', {
  headers: true,
  })
  .transform(row => ({
    id: parseInt(row.id),
    product_id: parseInt(row.product_id),
    body: row.body,
    date_written: parseDate(row.date_written),
    asker_name: row.asker_name,
    asker_email: row.asker_email,
    reported: parseInt(row.reported),
    helpful: parseInt(row.helpful),
  }))
  .on("data", (row) => {
    const data = Object.values(row).toString() + '\n';
    fs.appendFile('./cleaned_questions.csv', data, err => {
      if (err) {
        throw err;
      }
    });
  }).on("end", (count) => {
    console.log('finished');
  }).on("error", err => {
    console.log(err);
  });
