const express = require('express');
const bcrypt = require('bcrypt');

const { connection } = require('../services');

const router = express.Router();

/* GET reviews */
router.get('/', (req, res) => {
  // TODO
});

/* Add new Review */
router.post('/add', (req, res) => {
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
    approval_status: 'Pending',
  };

  connection.query('INSERT INTO Review SET ?', review, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ success: true, message: 'Success' });
  });
});

module.exports = router;
