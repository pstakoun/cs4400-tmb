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
    if (result.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json({ station: result[0] });
  });
});

/* GET line */
router.get('/:name/lines', (req, res) => {
  connection.query('SELECT line_name FROM Station_On_Line WHERE station_name = ?', [req.params.name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ lines: result });
  });
});

/* GET reviews for a station */
router.get('/:name/reviews', (req, res) => {
  connection.query("SELECT * FROM Review WHERE approval_status = 'approved' AND station_name = ?", [req.params.name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ reviews: result });
  });
});

/* GET average ragings for a station */
router.get('/:name/ratings', (req, res) => {
  connection.query("SELECT AVG(shopping) AS avgShopping, AVG(connection_speed) AS avgSpeed FROM Review WHERE approval_status = 'approved' AND station_name = ?", [req.params.name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    if (result.length === 0) {
      res.sendStatus(404);
    }
    res.status(200).json({ ratings: result[0] });
  });
});

module.exports = router;
