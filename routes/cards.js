const express = require('express');

const { connection } = require('../services');

const router = express.Router();

/* GET cards */
router.post('/buy', (req, res) => {
  const card = {
    userID,
    type,
    purchaseDateAndTime,
    usesLeft,
    expirationDate,
  } = req.body;

  res.send({
    code: 200,
    success: 'user purchased card successfully',
  });
});

module.exports = router;
