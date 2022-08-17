require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const productRouter = require('./routes/productRouter');
const checkoutRouter = require('./routes/checkoutRouter');
const apiRouter = require('./routes/apiRouter');

const app = express();

//Mongoose connection
mongoose.connect(`${process.env.MONGODB_URI}/store_data_test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', () => {
  console.error('MongoDB connection error:');
});

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_ORIGIN, 'http://checkout.stripe.com'],
  })
);

// routers
app.use('/products', productRouter);
app.use('/checkout', checkoutRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
