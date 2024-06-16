const { PDFDocument, rgb } = require('pdf-lib');
const User = require('../models/users');
const Bus = require('../models/buses');
const Booked = require('../models/booked');
const { comparePassword, hashPassword } = require("../security/hashing");

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
    // http://localhost:8000/details?name=GreenLine&from=NAIROBI&to=KISUMU&time=6%3A45AM+-+1%3A00PM&price=1000&seat=4A
    const { seat, name, from, to, time, price, ways, date } = req.query;
    // console.log(seat);
    res.render('userDetails', { seat, name, from, to, time, ways, date, price });
};

module.exports.seatSelection_get = (req, res) => {
   // http://localhost:8000/seats?name=EasyCoach&from=NAIROBI&to=KISUMU&1750&time=6:45AM%20-%201:00PM&
    const { name, from, to, time, price, ways, date } = req.query;
    // console.log(`name: ${name}, from: ${from}, to: ${to}, time: ${time}, price: ${price}`);
    res.render('seats', { name, from, to, time, price, ways, date });
};

module.exports.successBook_get = (req, res) => {
    const { seat, name, from, to, time, price, date } = req.query;
    res.render('success', { seat, name, from, to, time, price, date });
};

// Post controllers

module.exports.login_post = async (req, res) => {
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

        req.session.user = newUser;
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

    res.render('booking', { buses, ways, date })
};

module.exports.userDetails_post = async (req, res) => {
    const { firstName, lastName, idOrPassport, phoneNumber, nationality } = req.body;
    const { seat, name, from, to, time, price, date } = req.query;
    try {
        const bookedUser = await Booked.create({ firstName, lastName, idOrPassport, phoneNumber, nationality });
        res.redirect(`/success?seat=${seat}&name=${name}&from=${from}&to=${to}&time=${time}&price=${price}&date=${date}`);
    } catch (err) {
        throw new Error('User details not saved!!!');
    }
};

module.exports.download_get = async (req, res) => {
    const { seat, name, from, to, time, price, date } = req.query;

    try {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);

        // Set some text
        const fontSize = 24;
        page.drawText('Ticket Details', { x: 50, y: 350, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Name: ${name}`, { x: 50, y: 310, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`From: ${from}`, { x: 50, y: 270, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`To: ${to}`, { x: 50, y: 230, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Time: ${time}`, { x: 50, y: 190, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Date: ${date}`, { x: 50, y: 150, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Seat: ${seat}`, { x: 50, y: 110, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Price: ${price}`, { x: 50, y: 70, size: fontSize, color: rgb(0, 0, 0) });

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
