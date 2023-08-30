const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    issuer: {
        type: String,
        required: true,
    },
    ProfileId: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('USER', userschema);

module.exports = User;