const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// http://programmerblog.net/nodejs-authentication-jwt/

const router = express.Router();

/* GET users */
router.get('/', (req, res) => {
  // TODO
});

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
  res.sendStatus(200);
});

/* Log in user */
router.post('/login', (res, req) => {
  const {
    userID,
    password,
  } = req.body;
  jwt.sign(userID, 'supersecret', (err, token) => {
    res.status(200).json({ token });
  });
});

module.exports = router;
