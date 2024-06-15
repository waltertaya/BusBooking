const router = require('express').Router();
const controllers = require('../controllers/controller');

router.get('/login', controllers.login_get);
router.get('/register', controllers.signup_get);
router.get('/landing', controllers.landing_get);
router.get('/', controllers.booking_get);

module.exports = router;
