const mongoose = require('mongoose');

const schema = {
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}

const admin_schema = new mongoose.Schema(schema);
const Admins = mongoose.model('admins', admin_schema);
module.exports = Admins;