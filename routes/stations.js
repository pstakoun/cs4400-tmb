const express = require('express');

const router = express.Router();
const { connection } = require('../services');


/* GET stations */
router.get('/', (req, res) => {
  connection.query('SELECT name FROM Station', (err1, result1) => {
    if (err1) {
      console.log(err1);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json(result1);
  });
});

module.exports = router;
