const express = require('express');

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

module.exports = router;
