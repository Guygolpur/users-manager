const mongoose = require('mongoose');
const consts = require('./consts');
const { MONGODB_URL } = consts;
const url = MONGODB_URL;


// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});