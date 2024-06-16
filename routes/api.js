const express = require("express");
const Bus = require('../models/buses')

const api = express.Router();

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
