const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const stationsRouter = require('./routes/stations');
const linesRouter = require('./routes/lines');
const tripsRouter = require('./routes/trips');
const reviewsRouter = require('./routes/reviews');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app/build')));

app.use((req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return next();
  }
  token = token.replace('Bearer ', '');
  jwt.verify(token, 'supersecret', (err, user) => {
    if (!err) {
      req.token = token;
      req.user = user;
    }
    next();
  });
});

app.use('/api/users', usersRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/stations', stationsRouter);
app.use('/api/lines', linesRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/reviews', reviewsRouter);

app.use((req, res) => {
  res.sendFile(path.join(`${__dirname}/app/build/index.html`));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Listening on port ${port}`);
