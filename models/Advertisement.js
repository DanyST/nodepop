const mongoose = require('mongoose');

// schema define
const advertisementSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
});

// model create
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
