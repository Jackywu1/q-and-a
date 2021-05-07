const db = require('mysql');

let connection = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2431',
  database: 'test'
});

module.exports = connection;
