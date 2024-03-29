const express = require('express');
const { connection } = require('../services');

const router = express.Router();

/* GET reviews */
router.get('/', (req, res) => {
  connection.query('SELECT * FROM Review WHERE passenger_ID = ?', [req.session.user.ID], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    res.status(200).json({ reviews: result });
  });
});

/* GET pending reviews */
router.get('/pending', (req, res) => {
  connection.query('SELECT * FROM Review WHERE approval_status = ?', ['Pending'], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    res.status(200).json({ reviews: result });
  });
});

/* GET review */
router.get('/:id', (req, res) => {
  connection.query('SELECT * FROM Review WHERE rid = ? AND passenger_ID = ?', [req.params.id, req.session.user.ID], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    if (result.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json({ review: result[0] });
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

  if (!shopping || !speed) {
    return res.status(400).json({ message: 'Ratings cannot be empty' });
  }
  if (shopping > 5 || speed > 5) {
    return res.status(400).json({ message: 'Ratings invalid' });
  }

  const review = {
    passenger_ID: req.session.user.ID,
    station_name: station,
    shopping,
    connection_speed: speed,
    comment,
  };

  connection.query('INSERT INTO Review SET ?', [review], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    res.status(200).json({ success: true, message: 'Review created' });
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

  if (!shopping || !speed) {
    return res.status(400).json({ message: 'Ratings cannot be empty' });
  }
  if (shopping > 5 || speed > 5) {
    return res.status(400).json({ message: 'Ratings invalid' });
  }

  const review = {
    station_name: station,
    shopping,
    connection_speed: speed,
    comment,
    approver_ID: null,
    approval_status: 'Pending',
  };

  connection.query('UPDATE Review SET ? WHERE rid = ? AND passenger_ID = ?', [review, req.params.id, req.session.user.ID], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    res.status(200).json({ success: true, message: 'Review updated' });
  });
});

/* Approve review */
router.put('/:id/:user/approve', (req, res) => {
  connection.query("UPDATE Review SET approval_status = 'Approved', approver_ID = ? WHERE rid = ? AND passenger_ID = ?", [req.session.user.ID, req.params.id, req.params.user], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    res.status(200).json({ success: true, message: 'Review Approved' });
  });
});

/* Reject review */
router.put('/:id/:user/reject', (req, res) => {
  connection.query("UPDATE Review SET approval_status = 'Rejected', approver_ID = ? WHERE rid = ? AND passenger_ID = ?", [req.session.user.ID, req.params.id, req.params.user], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    res.status(200).json({ success: true, message: 'Review Rejected' });
  });
});

/* Delete review */
router.delete('/:id', (req, res) => {
  connection.query('DELETE FROM Review WHERE rid = ? AND passenger_ID = ?', [req.params.id, req.session.user.ID], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    res.status(200).json({ success: true, message: 'Review deleted' });
  });
});


module.exports = router;
