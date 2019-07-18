const express = require('express');

const router = express.Router();

/* GET reviews */
router.get('/', (req, res) => {
  // TODO
});

module.exports = router;


/* Add new Review */
router.post('/add', (req, res) => {
  const {
    passenger,
    station,
    shopping,
    connection,
    comment,
  } = req.body;

  review = {
    passenger_ID: passenger,
    station_name: station,
    shopping,
    connection_speed: connection,
    comment,
    approver_ID: NULL,
    edit_timestamp: NULL,
    approval_status: 'Pending',

  };
  /* passenger_ID varchar(255),
    rid int,
    shopping int,
    connection_speed int,
    comment text,
    approver_ID varchar(255),
    approval_status varchar(255),
    edit_timestamp Datetime,
    station_name varchar(255) NOT NULL,
    PRIMARY KEY (passenger_ID, rid),
    FOREIGN KEY(passenger_ID) REFERENCES User(ID),
    FOREIGN KEY(approver_ID) REFERENCES Admin(ID),
    FOREIGN KEY(station_name) REFERENCES Station(name) */

  connection.query('INSERT INTO Review SET ?', review, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ success: true, message: 'Success' });
  });
});
