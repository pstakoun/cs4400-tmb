const express = require('express');

const { connection } = require('../services');

const router = express.Router();

/* GET lines */
router.get('/', (req, res) => {
  connection.query('SELECT name FROM Line', (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ lines: result });
  });
});

/* GET lines */
router.get('/:name', (req, res) => {
  connection.query('SELECT line_name FROM Station_On_Line WHERE station_name = ?', [req.params.name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ lines: result });
  });
});

module.exports = router;
