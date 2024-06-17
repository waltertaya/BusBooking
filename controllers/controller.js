// const jwt = require('jsonwebtoken');

const { PDFDocument, rgb } = require('pdf-lib');
const User = require('../models/users');
const Bus = require('../models/buses');
const Booked = require('../models/booked');
const { comparePassword, hashPassword } = require("../security/hashing");

require('dotenv').config()

// create json web token
const maxAge = 7 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: maxAge
  });
};

// Get authentication controllers

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
    const { seat } = req.query;
    req.session.bookingDetails.seat = seat;
    res.render('userDetails', req.session.bookingDetails);
};

module.exports.seatSelection_get = (req, res) => {
    const { name, time, price } = req.query;
    req.session.bookingDetails.name = name;
    req.session.bookingDetails.time = time;

    if ((req.session.bookingDetails.twoWay) === 'two') {
        req.session.bookingDetails.price = parseFloat(price) * 2;
    } else {
        req.session.bookingDetails.price = price;
    }

    res.render('seats', req.session.bookingDetails);
};

module.exports.successBook_get = (req, res) => {
    res.render('success', req.session.bookingDetails);
};

// Post controllers

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const match = await comparePassword(password, user.password);
        if (match) {
            req.session.user = user;
            // const token = createToken(user._id);
            // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
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

    if (existingUser) {
        res.redirect('/login');
    } else {
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ name, email, password: hashedPassword });
        // const id = newUser._id;
        // const token = createToken(id);
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        req.session.user = newUser;
        res.redirect('/');
    }
};

module.exports.booking_post = async (req, res) => {
    const { from, to, date, twoWay } = req.body;
    const buses = await Bus.find({ from, to });

    let ways = 'one';

    if (twoWay === undefined) {
        ways = "one";
    } else {
        ways = 'two';
    }

    const bookingDetails = { from: from, to: to, date: date, twoWay: ways }
    req.session.bookingDetails = bookingDetails;

    res.render('booking', { buses, ways, date })
};

module.exports.userDetails_post = async (req, res) => {
    const { firstName, lastName, idOrPassport, phoneNumber, nationality } = req.body;
    try {
        const bookedUser = await Booked.create({ firstName, lastName, idOrPassport, phoneNumber, nationality });
        res.redirect('/success');
    } catch (err) {
        // throw new Error('User details not saved!!!');
        res.redirect('/');
    }
};

module.exports.download_get = async (req, res) => {
    const details = req.session.bookingDetails;
    const ways = (details.twoWay).toUpperCase();

    try {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([800, 500]);

        // Set some text
        page.drawText(`${ways} WAY TRIP`, { x: 50, y: 450, size: 24, color: rgb(0, 1, 1) });
        page.drawText('Enjoy your travel', { x: 50, y: 410, size: 12, color: rgb(0, 0, 0) });

        const fontSize = 14;

        page.drawText('Ticket Details', { x: 50, y: 350, size: 18, color: rgb(0, 1, 1) });
        page.drawText(`Name: ${details.name}`, { x: 50, y: 310, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`From: ${details.from}`, { x: 50, y: 270, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`To: ${details.to}`, { x: 50, y: 230, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Time: ${details.time}`, { x: 50, y: 190, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Date: ${details.date}`, { x: 50, y: 150, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Seat: ${details.seat}`, { x: 50, y: 110, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Price: KES ${details.price}.00`, { x: 50, y: 70, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText('Copyright: waltertaya.Inc', { x: 50, y: 30, size: fontSize, color: rgb(0, 0, 0) });

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ticket.pdf');

        // Send the PDF
        res.send(Buffer.from(pdfBytes));
    } catch (err) {
        console.error('Error creating PDF:', err);
        res.status(500).send('Error creating PDF');
    }
};
