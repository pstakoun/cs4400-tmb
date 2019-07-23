const express = require('express');
const { connection } = require('../services');

const router = express.Router();

/* GET users */
router.get('/', (req, res) => {
  res.status(200).json({});
});

/* Register user */
router.post('/register', (req, res) => {
  const {
    firstName,
    middleInitial,
    lastName,
    email,
    userID,
    password,
    confirmPassword,
  } = req.body;

  let errorMessage = null;

  if (!firstName) {
    errorMessage = 'First Name is required';
  } else if (!lastName) {
    errorMessage = 'Last Name is required';
  } else if (!email) {
    errorMessage = 'Email is required';
  } else if (!userID) {
    errorMessage = 'User ID is required';
  } else if (!password) {
    errorMessage = 'Password is required';
  } else if (password !== confirmPassword) {
    errorMessage = 'Passwords do not match';
  } else if (password.length < 8) {
    errorMessage = 'Password too short';
  }

  if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
  }

  const user = {
    ID: userID,
    first_name: firstName,
    minit: middleInitial,
    last_name: lastName,
    password,
    passenger_email: email,
  };

  connection.query('INSERT INTO User SET ?', user, (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'User ID must be unique' });
      }
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }
    res.status(200).json({ success: true, message: 'Success' });
  });
});

/* Log in user */
router.post('/login', (req, res) => {
  const {
    userID,
    password,
  } = req.body;

  connection.query('SELECT User.*, Admin.ID AS admin FROM User LEFT JOIN Admin ON User.ID = Admin.ID WHERE User.ID = ?', [userID], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'User ID or password is incorrect' });
    }

    const user = result[0];
    user.admin = !!user.admin;

    if (user.password !== password) {
      return res.status(401).json({ message: 'User ID or password is incorrect' });
    }

    req.session.user = user;

    res.status(200).json({ success: true, message: 'Success' });
  });
});

/* Log out user */
router.post('/logout', (req, res) => {
  req.session.user = null;
  res.status(200).json({ success: true, message: 'Success' });
});

/* Update Profile */
router.put('/', (req, res) => {
  const {
    firstName,
    middleInitial,
    lastName,
    email,
    userID,
    password,
    confirmPassword,
  } = req.body;

  let errorMessage = null;

  if (!firstName) {
    errorMessage = 'First Name is required';
  } else if (!lastName) {
    errorMessage = 'Last Name is required';
  } else if (!email) {
    errorMessage = 'Email is required';
  } else if (!userID) {
    errorMessage = 'User ID is required';
  } else if (!password) {
    errorMessage = 'Password is required';
  } else if (password !== confirmPassword) {
    errorMessage = 'Passwords do not match';
  } else if (password.length < 8) {
    errorMessage = 'Password too short';
  }

  if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
  }

  const user = {
    ID: userID,
    first_name: firstName,
    minit: middleInitial,
    last_name: lastName,
    password,
    passenger_email: email,
  };

  connection.query('UPDATE User SET ? WHERE ID = ?', [user, req.session.user.ID], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'User ID must be unique' });
      }
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }

    user.admin = req.session.user.admin;
    req.session.user = user;

    res.status(200).json({ success: true, message: 'Success' });
  });
});

/* Update Profile Admin */
router.put('/Admin', (req, res) => {
  const {
    firstName,
    middleInitial,
    lastName,
    userID,
    password,
    confirmPassword,
  } = req.body;

  let errorMessage = null;

  if (!firstName) {
    errorMessage = 'First Name is required';
  } else if (!lastName) {
    errorMessage = 'Last Name is required';
  } else if (!userID) {
    errorMessage = 'User ID is required';
  } else if (!password) {
    errorMessage = 'Password is required';
  } else if (password !== confirmPassword) {
    errorMessage = 'Passwords do not match';
  } else if (password.length < 8) {
    errorMessage = 'Password too short';
  }

  if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
  }

  const user = {
    ID: userID,
    first_name: firstName,
    minit: middleInitial,
    last_name: lastName,
    password,
  };

  connection.query('UPDATE User SET ? WHERE ID = ?', [user, req.session.user.ID], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'User ID must be unique' });
      }
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }

    user.admin = req.session.user.admin;
    req.session.user = user;

    res.status(200).json({ success: true, message: 'Success' });
  });
});

/* Delete User and Admin */
router.delete('/', (req, res) => {
  if (req.session.user.admin) {
    connection.query('DELETE FROM Station '
      + 'WHERE name IN (SELECT names '
      + 'FROM (SELECT DISTINCT Station.name as names '
      + 'FROM Station LEFT OUTER JOIN Admin_Add_Station '
      + 'ON Station.name = Admin_Add_Station.station_name '
      + 'WHERE Admin_Add_Station.admin_id = ? ) AS required)', [req.session.user.ID], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error ocurred' });
      }
      connection.query('DELETE FROM Line '
          + 'WHERE name IN (SELECT names '
          + 'FROM (SELECT DISTINCT Line.name as names '
          + 'FROM Line LEFT OUTER JOIN Admin_Add_Line '
          + 'ON Line.name = Admin_Add_Line.line_name '
          + 'WHERE Admin_Add_Line.admin_id = ? ) AS required);', [req.session.user.ID], (err2) => {
        if (err2) {
          console.log(err2);
          return res.status(500).json({ message: 'An error ocurred' });
        }
        connection.query('DELETE FROM User WHERE ID = ?', [req.session.user.ID], (err3) => {
          if (err3) {
            console.log(err3);
            return res.status(500).json({ message: 'An error ocurred' });
          }
          req.session.user = null;
          res.status(200).json({ success: true, message: 'Success' });
        });
      });
    });
  } else {
    connection.query('DELETE FROM User WHERE ID = ?', [req.session.user.ID], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error ocurred' });
      }
      req.session.user = null;
      res.status(200).json({ success: true, message: 'Success' });
    });
  }
});

module.exports = router;
