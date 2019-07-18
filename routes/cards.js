const express = require('express');

const { connection } = require('../services');

const router = express.Router();

/* GET cards */
router.post('/buy', (req, res) => {
  const {
    userID,
    type,
    purchaseDateAndTime,
    usesLeft,
    expirationDate,
  } = req.body;

  res.status(200).json({ message: 'Success' });
});

module.exports = router;
