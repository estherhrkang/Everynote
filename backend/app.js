// import packages
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

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



module.exports = app;