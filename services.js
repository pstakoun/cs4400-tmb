const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tmb-user',
  password: 'password',
  database: 'tmb',
});
connection.connect();

module.exports = {
  connection,
};
