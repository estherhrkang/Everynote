const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

// test route
router.get('/hello/world', function(req, res) {
    // setting cookie on the response with name 'XSRF-TOKEN' to the value of req.csrfToken method's return
    res.cookie('XSRF-TOKEN', req.csrfToken());
    // sending text as response's body
    res.send('Hello World!');
});

module.exports = router;