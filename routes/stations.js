const express = require('express');

const router = express.Router();
const { connection } = require('../services');


/* GET stations */
router.get('/', (req, res) => {
  connection.query('SELECT name FROM Station ORDER BY name ASC', (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ stations: result });
  });
});

/* GET station */
router.get('/:name', (req, res) => {
  connection.query('SELECT * FROM Station WHERE name = ?', [req.params.name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ stations: result });
  });
});

/* GET stations on a given line */
router.get('/stationLines/:line', (req, res) => {
  connection.query('SELECT station_name, order_number FROM Station_On_Line WHERE line_name = ?', [req.params.line], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ stations: result });
  });
});

module.exports = router;
