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

/* GET stations on a given line */
router.get('/:name/stations', (req, res) => {
  connection.query('SELECT station_name, order_number FROM Station_On_Line WHERE line_name = ? ORDER BY order_number ASC', [req.params.line], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ stations: result });
  });
});

module.exports = router;
