const express = require('express');
const { connection } = require('../services');

const router = express.Router();

const types = {
  'T-mes': {
    uses: null,
    days: null,
  },
  'T-10': {
    uses: 10,
    days: null,
  },
  'T-50/30': {
    uses: 50,
    days: 30,
  },
  'T-jove': {
    uses: null,
    days: 90,
  },
};

/* GET cards */
router.get('/', (req, res) => {
  connection.query('SELECT * FROM Card WHERE user_ID = ? AND (expiration_date IS NULL OR expiration_date >= CURRENT_TIMESTAMP) AND (uses_left IS NULL OR uses_left > 0)', [req.session.user.ID], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ cards: result });
  });
});

/* Buy card */
router.post('/', (req, res) => {
  const { type } = req.body;
  let expirationDate = types[type].days ? new Date() : null;
  if (expirationDate) {
    expirationDate.setDate(expirationDate.getDate() + types[type].days);
  } else if (type === 'T-mes') {
    expirationDate = new Date();
    expirationDate = new Date(expirationDate.setMonth(expirationDate.getMonth() + 1));
  }

  const card = {
    user_ID: req.session.user.ID,
    type,
    uses_left: types[type].uses,
    expiration_date: expirationDate,
  };

  connection.query('INSERT INTO Card SET ?', card, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ success: true, message: `${type} purchased` });
  });
});

module.exports = router;
