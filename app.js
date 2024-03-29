const express = require('express');
const path = require('path');
const session = require('express-session');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const stationsRouter = require('./routes/stations');
const linesRouter = require('./routes/lines');
const tripsRouter = require('./routes/trips');
const reviewsRouter = require('./routes/reviews');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app/build')));

app.use(session({
  secret: 'tmbsupersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
  },
}));

app.use('/api/me', (req, res) => {
  const { user } = req.session;
  res.status(user ? 200 : 404).json(user || {});
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
