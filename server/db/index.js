const db = require('mysql');

let connection = db.createPool({
  connectionLimit: 10,
  host: '3.128.31.38',
  user: 'user',
  password: 'pass',
  database: 'QA'
});

module.exports = connection;
