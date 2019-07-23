const express = require('express');

const router = express.Router();
const { connection } = require('../services');

/* GET stations */
router.get('/', (req, res) => {
  connection.query('SELECT name FROM Station ORDER BY name ASC', (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ stations: result });
  });
});

/* GET station */
router.get('/:name', (req, res) => {
  connection.query('SELECT * FROM Station WHERE name = ?', [req.params.name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    if (result.length === 0) {
      return res.sendStatus(404);
    }
    res.status(200).json({ station: result[0] });
  });
});

/* GET line */
router.get('/:name/lines', (req, res) => {
  connection.query('SELECT line_name FROM Station_On_Line WHERE station_name = ?', [req.params.name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ lines: result });
  });
});

/* GET reviews for a station */
router.get('/:name/reviews', (req, res) => {
  connection.query("SELECT * FROM Review WHERE approval_status = 'approved' AND station_name = ?", [req.params.name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ reviews: result });
  });
});

/* GET average ratings for a station */
router.get('/:name/ratings', (req, res) => {
  connection.query("SELECT AVG(shopping) AS avgShopping, AVG(connection_speed) AS avgSpeed FROM Review WHERE approval_status = 'approved' AND station_name = ?", [req.params.name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    if (result.length === 0) {
      res.sendStatus(404);
    }
    res.status(200).json({ ratings: result[0] });
  });
});

/* Update station status */
router.put('/:name/:status/update', (req, res) => {
  connection.query('UPDATE Station SET status = ? WHERE name = ?', [req.params.status, req.params.name], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    res.status(200).json({ success: true, message: 'Update successful' });
  });
});

/* Create station */
router.post('/', (req, res) => {
  const {
    name,
    status,
    stateProvince,
    address,
    zipcode,
    city,
    newLines,
  } = req.body;

  const createDate = new Date();

  const station = {
    name,
    status,
    state_province: stateProvince,
    address,
    zipcode,
    city,
  };

  const mappedLines = newLines.map(lines => ({
    station_name: name,
    line_name: lines.name,
    order_number: lines.order_num,
  }));
  if (mappedLines.length < 1) {
    return res.status(400).json({ message: 'Add a line in order to make the station' });
  }

  const adminAdd = {
    station_name: name,
    admin_ID: req.session.user.ID,
    date_time: createDate,
  };

  connection.query('INSERT INTO Station SET ?', [station], (err) => {
    if (err) {
      console.log(err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Station name and location must be unique' });
      }
      return res.status(500).json({ message: 'An error occurred' });
    }
    connection.query('INSERT INTO Admin_Add_Station SET ?', [adminAdd], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error occurred' });
      }
      let left = mappedLines.length;
      if (left === 0) {
        res.status(200).json({
          success: true,
          message: 'Station created',
        });
      }
      mappedLines.forEach((item) => {
        connection.query('INSERT INTO Station_On_Line SET ?', [item], (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: 'An error occurred' });
          }
          left -= 1;
          if (left === 0) {
            res.status(200).json({
              success: true,
              message: 'Station created',
            });
          }
        });
      });
    });
  });
});


module.exports = router;
