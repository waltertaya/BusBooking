const express = require("express");
const Bus = require('../models/buses')

const api = express.Router();

api.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const match = await comparePassword(password, user.password);
        if (match) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
});

api.post('/signup', async (req, res) => {
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

        req.session.user = newUser;
        res.redirect('/');
    }
});

router.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/landing')
    }
});

// name: "EasyCoach",
// from: "NAIROBI",
// to: "MOMBASA",
// time: "08:00 AM",
// price: 1500,
// remainingSeats: 25

api.post('/', async (req, res) => {
    const { name, from, to, time, price, remainingSeats } = req.body;
    try {
        await Bus.create({ name, from, to, time, price, remainingSeats });
        res.status(201).json({message: 'Buses added successfully'})
    } catch (err) {
        res.status(400).json({Error: `${err}`});
    }
});

module.exports = api;
