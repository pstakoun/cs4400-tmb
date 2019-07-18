const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tmb-user',
  password: 'password',
  database: 'tmb',
});
connection.connect();

/* GET cards */
router.post('/buy', (req, res) => {
  const card = {
    userID,
    type,
    purchaseDateAndTime,
    usesLeft,
    expirationDate,
  } = req.body;

  res.send({
    code: 200,
    success: 'user purchased card successfully',
  });
});

module.exports = router;
