const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('error', (err) => {
    console.log('MongoDB error: : ', err);
});

conn.once('open', () => {
    console.log('MongoDB connected in', conn.name);
});

mongoose.connect('mongodb://localhost/nodepop');

module.exports = conn;
