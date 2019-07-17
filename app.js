var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var usersRouter = require('./routes/users');
var cardsRouter = require('./routes/cards');
var stationsRouter = require('./routes/stations');
var linesRouter = require('./routes/lines');
var tripsRouter = require('./routes/trips');
var reviewsRouter = require('./routes/reviews');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app/build')));

app.use('/api/users', usersRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/stations', stationsRouter);
app.use('/api/lines', linesRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/reviews', reviewsRouter);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname+'/app/build/index.html'));
});

module.exports = app;
