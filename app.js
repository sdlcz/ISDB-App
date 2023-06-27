const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');


// import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const albumsRouter = require('./routes/albums');
const tracksRoutes = require('./routes/tracks');
const genresRoutes = require('./routes/genres');
const artistsRoutes = require('./routes/artists');

const Mongoose = require('mongoose');


//Mongoose.connect('mongodb+srv://stanton:Password123@clusterisdb.i4vce.mongodb.net/isdb?retryWrites=true&w=majority')
Mongoose.connect('mongodb://127.0.0.1:27017/isdb')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
require('./middleware/auth.js');


// attach endpoints 
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRoutes);
app.use('/genres', genresRoutes);
app.use('/artists', artistsRoutes);


//catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
