// import packages
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { ValidationError } = require('sequelize');

// check environment
const { environment } = require('./config');
const isProduction = environment === 'production';

// initialize Express app
const app = express();

// connect morgan middleware for logging info about req and res
app.use(morgan('dev'));

// middlewares for (1) parsing cookies (2) parsing JSON bodies of requests with 'Content-Type' of 'application/json'
app.use(cookieParser());
app.use(express.json());


// \/ security middlewares \/

// enable cors only in development, b/c React frontend is served from a different server than Express server
if (!isProduction) {
    app.use(cors());
};

// enable helmet middleware for better overall security
app.use(helmet({
    contentSecurityPolicy: false
}));

// enable csurf middleware to set the _csurf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            httpOnly: true
        }
    })
);

app.use(routes);


// \/ error-handlers \/

// 404 resource not found error-handler
app.use((_req, _res, next) => {
    const err = new Error('The requested resource could not be found.');
    err.title = 'Resource Not Found';
    err.errors = ['The requested resource could not be found.'];
    err.status = 404;
    next(err);
});

// Sequelize error-handler
// catching Sequelize errors and formatting them before sending the error response
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error
    if (err instanceof ValidationError) {
        err.errors = err.errors.map(e => e.message);
        err.title = 'Validation Error';
    };
    next(err);
})

// error formatter error-handler
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});



module.exports = app;