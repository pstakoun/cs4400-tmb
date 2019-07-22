const express = require('express');
const { connection } = require('../services');

const router = express.Router();

/* GET cards */
router.get('/', (req, res) => {
  connection.query('SELECT * FROM Card', (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ cards: result });
  });
});

/* Buy card */
router.post('/', (req, res) => {
  const {
    type,
    purchaseDateAndTime,
    usesLeft,
    expirationDate,
  } = req.body;

  const card = {
    user_ID: req.session.user.ID,
    type,
    purchase_date_time: purchaseDateAndTime,
    uses_left: usesLeft,
    expiration_date: expirationDate,
  };

  connection.query('INSERT INTO Card SET ?', card, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ success: true, message: 'Success' });
  });
});

module.exports = router;
