const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MongoDB connection through Mongoose
require('./lib/connectMongoose');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/v1/advertisements', require('./routes/api/v1/advertisements'));
app.use('/api/v1/users', require('./routes/api/v1/users'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    if (err.array) { // validation error
        err.status = 422;
        const errInfo = err.array({ onlyFirstError: true })[0];
        err.message = `Error Validation - ${errInfo.param} ${errInfo.msg}`;
    }

    res.status(err.status || 500);

    // its API request, return JSON response
    if (isAPI(req)) {
        res.json({ success: false, error: err.message });
        return;
    }

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.render('error');
});

function isAPI(req) {
    return req.originalUrl.indexOf('/api/') === 0;
}

module.exports = app;
