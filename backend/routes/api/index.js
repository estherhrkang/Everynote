const router = require('express').Router();

// connect all the routes
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

// test route
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });

// \/ test setTokenCookie auth middleware \/
// GET /api/set-token-cookie
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
    // getting demo user and calling setTokenCookie
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        },
        })
    setTokenCookie(res, user);
    return res.json({ user });
}));

// \/ test restoreUser auth middleware \/
// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get(
    '/restore-user',
    restoreUser,
    (req, res) => {
        return res.json(req.user);
    }
);

// \/ test requireAuth auth middleware \/
// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
    '/require-auth',
    requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);

module.exports = router;