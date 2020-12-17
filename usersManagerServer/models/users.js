const mongoose = require('mongoose');

const schema = {
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String,
    },
    company: {
        type: String
    },
    phone: {
        type: Number,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}

const user_schema = new mongoose.Schema(schema);
const user = mongoose.model('users', user_schema);
module.exports = user;