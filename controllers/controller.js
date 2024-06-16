const User = require('../models/users');
const Bus = require('../models/buses');
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
    const buses = [];
    res.render('booking', { buses });
};

module.exports.userDetails_get = (req, res) => {
    const seat = req.query.seat;
    // console.log(seat);
    res.render('userDetails', { seat });
};

module.exports.seatSelection_get = (req, res) => {
   // http://localhost:8000/seats?name=EasyCoach&from=NAIROBI&to=KISUMU&1750&time=6:45AM%20-%201:00PM&
    const { name, from, to, time, price } = req.query;
    console.log(`name: ${name}, from: ${from}, to: ${to}, time: ${time}, price: ${price}`);
    res.render('seats', { name, from, to, time, price });
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

module.exports.booking_post = async (req, res) => {
    const { from, to, date, twoWay } = req.body;
    // console.log(`from: ${from}, to: ${to}, date: ${date}, twoWay: ${twoWay}`);
    const buses = await Bus.find({ from, to });
    // console.log(buses);
    let ways = "one";
    if (!(twoWay === undefined)) {
        ways = "two";
    }

    res.render('booking', { buses, ways })
};
