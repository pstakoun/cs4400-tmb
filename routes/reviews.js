const express = require('express');
const { connection } = require('../services');

const router = express.Router();

/* GET reviews */
router.get('/', (req, res) => {
  connection.query('SELECT * FROM Review WHERE passenger_ID = ?', [req.session.user.ID], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ reviews: result });
  });
});

/* GET pending reviews */
router.get('/pending', (req, res) => {
  connection.query('SELECT * FROM Review WHERE approval_status = ?', ['pending'], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ reviews: result });
  });
});

/* GET review */
router.get('/:id', (req, res) => {
  connection.query('SELECT * FROM Review WHERE rid = ?', [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ review: result });
  });
});

/* Create review */
router.post('/', (req, res) => {
  const {
    station,
    shopping,
    speed,
    comment,
  } = req.body;

  const review = {
    passenger_ID: req.session.user.ID,
    station_name: station,
    shopping,
    connection_speed: speed,
    comment,
    approver_ID: null,
    edit_timestamp: null,
    approval_status: 'pending',
  };

  connection.query('INSERT INTO Review SET ?', [review], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ success: true, message: 'Success' });
  });
});

/* Update review */
router.put('/:id', (req, res) => {
  const {
    station,
    shopping,
    speed,
    comment,
  } = req.body;

  const review = {
    passenger_ID: req.session.user.ID,
    station_name: station,
    shopping,
    connection_speed: speed,
    comment,
    approver_ID: null,
    edit_timestamp: null, // TODO
    approval_status: 'pending',
  };

  connection.query('UPDATE Review SET ? WHERE rid = ?', [review, req.params.id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ success: true, message: 'Success' });
  });
});

/* Delete review */
router.delete('/:id', (req, res) => {
  connection.query('DELETE FROM Review WHERE rid = ?', [req.params.id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ success: true, message: 'Success' });
  });
});

module.exports = router;
