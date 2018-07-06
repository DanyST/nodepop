const mongoose = require('mongoose');

// schema define
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// model create
const User = mongoose.model('User', userSchema);

module.exports = User;
