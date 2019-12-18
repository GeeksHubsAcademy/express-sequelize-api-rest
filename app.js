var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {
  authorizationMiddleware,
} = require('./middlewares/auth');

var ordersRouter = require('./routes/orders');
var authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/orders', authorizationMiddleware, ordersRouter);
app.use('/auth', authRouter);

module.exports = app;
