const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// http://programmerblog.net/nodejs-authentication-jwt/

const router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tmb-user',
  password: 'password',
  database: 'tmb',
});
connection.connect();

/* GET users */
router.get('/', (req, res) => res.status(200).json({}));

/* Register user */
router.post('/register', (req, res) => {
  const {
    firstName,
    middleInitial,
    lastName,
    email,
    userID,
    password,
    confirmPassword,
  } = req.body;
  // TODO register user
  connection.query('TODO', (error, results, fields) => {
    if (error) {
      throw error;
      // return res.sendStatus(500);
    }
    if (results.length > 0) {
      // TODO already exists
    }
    // TODO insert user
    return res.sendStatus(200);
  });
});

/* Log in user */
router.post('/login', (res, req) => {
  const {
    userID,
    password,
  } = req.body;
  // TODO confirm user in db
  const user = {
    id: userID,
    admin: false,
  };
  jwt.sign(user, 'supersecret', (err, token) => res.status(200).json({ user, token }));
});

/* Authenticates user */
router.post('/authenticate', (res, req) => {
  const { token } = req.body;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, 'supersecret', (err, user) => {
    if (err) {
      throw err;
    }
    // TODO Get user from db by user.id
  });
});

module.exports = router;
