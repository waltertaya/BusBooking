const router = require('express').Router();
const controllers = require('../controllers/controller');
// const { hashPassword, comparePassword } = require('../security/hashing');
// const User = require('../models/users');

// Get routes

router.get('/login', controllers.login_get);
router.get('/register', controllers.signup_get);
router.get('/landing', controllers.landing_get);
router.get('/', controllers.booking_get);
router.get('/seats', controllers.seatSelection_get);
router.get('/details', controllers.userDetails_get);
router.get('/success', controllers.successBook_get);

// Post routes
router.post('/login', controllers.login_post);
router.post('/register', controllers.signup_post);
router.post('/', controllers.booking_post);

module.exports = router;
