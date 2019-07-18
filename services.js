const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tmb-user',
  password: 'password',
  database: 'TMB',
});
connection.connect();

module.exports = {
  connection,
};
