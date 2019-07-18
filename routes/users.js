const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { connection } = require('../services');

// http://programmerblog.net/nodejs-authentication-jwt/

const router = express.Router();

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

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password too short' });
  }

  const user = {
    ID: userID,
    first_name: firstName,
    minit: middleInitial,
    last_name: lastName,
    password, // TODO hash password
    passenger_email: email,
  };

  connection.query('INSERT INTO User SET ?', user, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ message: 'Success' });
  });
});

/* Log in user */
router.post('/login', (req, res) => {
  const {
    userID,
    password,
  } = req.body;

  connection.query('SELECT * FROM User WHERE ID = ?', [userID], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }

    const user = result[0];

    if (user.length === 0) {
      return res.status(401).json({ message: 'User ID or password is incorrect' });
    }

    if (user.password !== password) { // TODO handle hash
      return res.status(401).json({ message: 'User ID or password is incorrect' });
    }

    delete user.password;

    connection.query('SELECT * FROM Admin WHERE ID = ?', [userID], (err1, result1) => {
      if (err1) {
        console.log(err1);
        return res.status(500).json({ message: 'An error ocurred' });
      }

      if (result1.length > 0) {
        user.admin = true;
      }

      jwt.sign(user, 'supersecret', (err2, token) => res.status(200).json({ user, token }));
    });
  });
});

/* Authenticates user */
router.post('/authenticate', (req, res) => {
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
