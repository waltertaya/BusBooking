const { Schema, model } = require('mongoose');

const bookedSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    idOrPassport: {
        type: String,
        required: true,
        // unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    }
});

const Booked = model('book', bookedSchema);
module.exports = Booked;
