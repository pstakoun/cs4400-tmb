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
  connection.query('SELECT station_name, order_number FROM Station_On_Line WHERE line_name = ? ORDER BY order_number ASC', [req.params.name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ stations: result });
  });
});

/* GET station with a given order number */
router.get('/:name/:orderNumber', (req, res) => {
  connection.query('SELECT EXISTS(SELECT * FROM Station_On_Line WHERE line_name = ? AND order_number = ?) AS matched', [req.params.name, req.params.orderNumber], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ matches: result });
  });
});

/* Create line */
router.post('/', (req, res) => {
  const {
    name,
    newStations,
  } = req.body;

  const line = { name };

  const mappedStations = newStations.map(station => ({
    station_name: station.name,
    line_name: name,
    order_number: station.order_num,
  }));

  connection.query('INSERT INTO Line SET ?', [line], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error occurred' });
    }
  });

  mappedStations.forEach((item) => {
    connection.query('INSERT INTO Station_On_Line SET ?', [item], (err) => {
      if (err) {
        console.log(err);
        return res.status(500)
          .json({ message: 'An error occurred' });
      }
    });
  });
  res.status(200)
    .json({
      success: true,
      message: 'Line created',
    });
});

/* GET station with a given order number */
router.put('/order', (req, res) => {
  const {
    orderNumber,
    line,
    station,
  } = req.body;
  if (orderNumber < 1) {
    return res.status(400).json({ message: 'Order number must be positive' });
  }
  connection.query('UPDATE Station_On_Line SET order_number = ? WHERE line_name = ? AND station_name = ?', [orderNumber, line, station], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({});
  });
});

module.exports = router;
