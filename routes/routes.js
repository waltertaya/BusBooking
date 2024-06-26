const router = require('express').Router();
const controllers = require('../controllers/controller');
// const { hashPassword, comparePassword } = require('../security/hashing');
// const User = require('../models/users');

// GET || POST authentication and landing page

router.get('/login', controllers.login_get);
router.get('/register', controllers.signup_get);
router.get('/landing', controllers.landing_get);

router.post('/login', controllers.login_post);
router.post('/register', controllers.signup_post);

// login required

router.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/landing')
    }
});


// Get routes

router.get('/', controllers.booking_get);
router.get('/seats', controllers.seatSelection_get);
router.get('/details', controllers.userDetails_get);
router.get('/success', controllers.successBook_get);
router.get('/download-ticket', controllers.download_get);

// Post routes

router.post('/', controllers.booking_post);
router.post('/details', controllers.userDetails_post);

module.exports = router;
