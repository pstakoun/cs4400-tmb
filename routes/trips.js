const express = require('express');
const { connection } = require('../services');

const router = express.Router();

/* GET trips */
router.get('/', (req, res) => {
  connection.query('SELECT * FROM Trip', (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ trips: result });
  });
});

/* Create trip */
router.post('/', (req, res) => {
  const {
    type,
    purchaseDateTime,
    startDateTime,
    fromStation,
  } = req.body;

  const trip = {
    user_ID: req.session.user.ID,
    card_type: type,
    card_purchase_date_time: purchaseDateTime,
    start_date_time: startDateTime,
    end_date_time: null,
    from_station_name: fromStation,
    to_station_name: null,
  };

  connection.query('INSERT INTO Trip SET ?', [trip], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ success: true, message: 'Success' });
  });
});

module.exports = router;
