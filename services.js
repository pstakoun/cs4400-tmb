const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tmb-user',
  password: 'password',
  database: 'TMB',
});
connection.connect();

const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  connection.query('SELECT * FROM User WHERE ID = ?', [req.session.user.ID], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }

    if (result.length === 0) {
      return res.redirect('/login');
    }

    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  connection.query('SELECT * FROM User WHERE ID = ?', [req.session.user.ID], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error ocurred' });
    }

    if (result.length === 0) {
      return res.redirect('/login');
    }

    connection.query('SELECT * FROM Admin WHERE ID = ?', [req.session.user.ID], (err1, result1) => {
      if (err1) {
        console.log(err1);
        return res.status(500).json({ message: 'An error ocurred' });
      }

      if (result1.length === 0) {
        return res.status(403).json({ message: 'You do not have permission to access this resource' });
      }

      next();
    });
  });
};

module.exports = {
  connection,
  requireLogin,
  requireAdmin,
};