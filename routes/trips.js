const express = require('express');
const { connection } = require('../services');

const router = express.Router();

/* GET trips */
router.get('/', (req, res) => {
  connection.query('SELECT * FROM Trip WHERE user_ID = ?', [req.session.user.ID], (err, result) => {
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
    fromStation,
  } = req.body;

  const purchaseDateTime = new Date(req.body.purchaseDateTime);

  connection.query('SELECT * FROM Card WHERE user_ID = ? AND type = ? AND purchase_date_time = ?', [req.session.user.ID, type, purchaseDateTime], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const card = result[0];

    if (card.expiration_date && card.expiration_date < new Date().setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: 'Card expired' });
    }
    if (card.uses_left && card.uses_left < 1) {
      return res.status(400).json({ message: 'No uses left' });
    }

    const trip = {
      user_ID: req.session.user.ID,
      card_type: type,
      card_purchase_date_time: purchaseDateTime,
      from_station_name: fromStation,
    };

    connection.query('INSERT INTO Trip SET ?', [trip], (err1) => {
      if (err1) {
        console.log(err1);
        return res.status(500).json({ message: 'An error ocurred' });
      }
      if (card.uses_left) {
        connection.query('UPDATE Card SET uses_left = uses_left - 1 WHERE user_ID = ? AND type = ? AND purchase_date_time = ?', [req.session.user.ID, type, purchaseDateTime], (err2, result) => {
          if (err2) {
            console.log(err2);
            return res.status(500).json({ message: 'An error ocurred' });
          }
          res.status(200).json({ success: true, message: 'Trip created' });
        });
      } else {
        res.status(200).json({ success: true, message: 'Trip created' });
      }
    });
  });
});

module.exports = router;
