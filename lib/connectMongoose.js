const mongoose = require('mongoose');

const conn = mongoose.connection;

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nodepop';


conn.on('error', (err) => {
    console.log('MongoDB error: : ', err);
});

conn.once('open', () => {
    console.log('MongoDB connected in', conn.name);
});

mongoose.connect(databaseUri);

module.exports = conn;
