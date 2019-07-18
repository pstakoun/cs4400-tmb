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
  const user = {
    firstName,
    middleInitial,
    lastName,
    email,
    userID,
    password,
    confirmPassword,
  } = req.body;
  // TODO register user
  if (user.password != user.confirmPassword) {
    alert("Passwords don't match");
    res.send({
      code: 500,
      failed: "Passwords don't match",
    });
  } else if (length(user.password) < 8) { // TODO MOVE THIS TO SQL!
    alert('Password must be longer then 8 characters');
    res.send({
      code: 500,
      failed: 'Passwords too short',
    });
  } else {
    connection.query('INSERT INTO User SET ?', user, (error, results, fields) => {
      if (error) {
        console.log('error ocurred', error);
        res.send({
          code: 500,
          failed: 'error ocurred',
        });
      } else {
        console.log('The solution is: ', results);
        res.send({
          code: 200,
          success: 'user registered sucessfully',
        });
      }
    });
  /* connection.query('TODO', (error, results, fields) => {
    if (error) {
      throw error;
      // return res.sendStatus(500);
    }
    if (results.length > 0) {
      // TODO already exists
    }
    // TODO insert user
    return res.sendStatus(200);
  }); */
  }
});

/* Log in user */
router.post('/login', (req, res) => {
  const {
    userID,
    password,
  } = req.body;
  // TODO confirm user in db

  connection.query('SELECT * FROM User WHERE ID = ?', [userID], (error, results, fields) => {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        code: 400,
        failed: 'error ocurred',
      });
    } else {
      // console.log('The solution is: ', results);
      if (results.length > 0) {
        if (results[0].password == password) {
          res.send({
            code: 200,
            success: 'login sucessfull',
          });
        } else {
          res.send({
            code: 204,
            success: 'Email and password does not match',
          });
        }
      } else {
        res.send({
          code: 204,
          success: 'Email does not exits',
        });
      }
    }
  });

  // TODO route to admin home or not based on if admin or not
  const user = {
    id: userID,
    admin: false,
  };
  jwt.sign(user, 'supersecret', (err, token) => res.status(200).json({ user, token }));
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
