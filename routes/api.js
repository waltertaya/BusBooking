const express = require("express");
const Bus = require('../models/buses');

const api = express.Router();

api.get('/', async (req, res) => {
    const buses = await Bus.find();
    res.status(200).json(buses);
});

api.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const bus = await Bus.findById(id);
        res.status(200).json(bus);
    } catch (err) {
        res.status(404).json({ message: `The id - ${id} does not exist`, error: err });
    }
});

api.post('/', async (req, res) => {
    const { name, from, to, time, price, remainingSeats } = req.body;
    try {
        await Bus.create({ name, from, to, time, price, remainingSeats });
        res.status(201).json({message: 'Buses added successfully'})
    } catch (err) {
        res.status(400).json({Error: `${err}`});
    }
});

api.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const bus = await Bus.findByIdAndDelete(id);
        res.status(204).json({ message: `The bus id - ${id} has been deleted`, Deleted: bus });
    } catch (err) {
        res.status(404).json({ message: `The id - ${id} does not exist`, error: err });
    }
});

module.exports = api;
