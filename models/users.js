const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema({
    name: {
        required: [true, 'Provide your names, Cannot be empty'],
        type: String
    },
    email: {
        type: String,
        required: [true, 'Provide email. Email required'],
        unique: true,
        validate: [isEmail, 'Enter valid email'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Provide password! Cannot be empty'],
        minLength: [8, 'The password should have a minimum length of 8']
    }
});

const User = model('user', userSchema);
module.exports = User;
