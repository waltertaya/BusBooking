const User = require('../models/users');
const { comparePassword, hashPassword } = require("../security/hashing");
// Get controllers

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.signup_get = (req, res) => {
    res.render('signup');
};

module.exports.landing_get = (req, res) => {
    res.render('landingPage');
};

module.exports.booking_get = (req, res) => {
    res.render('booking');
};

module.exports.userDetails_get = (req, res) => {
    res.render('userDetails');
};

module.exports.seatSelection_get = (req, res) => {
    res.render('seats');
};

module.exports.successBook_get = (req, res) => {
    res.render('success');
};

// Post controllers

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const match = await comparePassword(password, user.password);
        if (match) {
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
};

module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    // console.log(`name: ${name}, email: ${email}, password: ${password}`);
    if (existingUser) {
        // console.log('User exist already exist');
        res.redirect('/login');
    } else {
        const hashedPassword = await hashPassword(password);
        // console.log(`Hashed Password: ${hashedPassword}`)
        const newUser = await User.create({ name, email, password: hashedPassword });
        // console.log('User registered successfully');
        res.redirect('/');
    }
};
