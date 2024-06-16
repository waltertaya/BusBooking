const { Schema, model } = require('mongoose');

const busSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    remainingSeats: {
        type: Number,
        required: true,
    }
});

const Bus = model('bus', busSchema);
module.exports = Bus;
