const mongoose = require('mongoose');

// schema define
const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

// model create
const User = mongoose.model('User', userSchema);

module.exports = User;
