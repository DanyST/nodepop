// MongoDB connection through Mongoose and get connection in constant
const conn = require('./connectMongoose');

// file
const path = require('path');
const fsp = require('./fileSystemPromise');

const advertisementsFileJson = path.join('seeds', 'advertisements.json');
const usersFileJson = path.join('seeds', 'users.json');

// get mongoose models
const Advertisement = require('../models/Advertisement');
const User = require('../models/User');

// hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPasswordUsers(userArray) {
    for (const user of userArray) {
        const hashPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashPassword;
    }
    return userArray;
}

// script function
const refreshDbAndMigrate = async () => {
    try {
        // Advertisements remove
        console.log('removing Advertisements');
        await Advertisement.remove().exec();
        console.log('Advertisements removeds successfully');

        // Advertisements add new
        console.log('adding new advertisements');
        const advertisements = await fsp.readFilePromise(advertisementsFileJson, 'utf8');
        const advertisementObject = JSON.parse(advertisements);
        await Advertisement.insertMany(advertisementObject.data);
        console.log('Advertisements saved successfully');

        // Users removed
        console.log('removing Users');
        await User.remove().exec();
        console.log('Users removeds successfully');

        // Users add
        console.log('adding new users')
        const users = await fsp.readFilePromise(usersFileJson, 'utf8');
        const userObject = JSON.parse(users);
        const userObjectWithHashPassword = await hashPasswordUsers(userObject.data);
        await User.insertMany(userObjectWithHashPassword);
        console.log('Users saved successfully');
    } catch (err) {
        console.error(err);
    }
    conn.close();
    console.log('MongoDB connection closed');
};

refreshDbAndMigrate();
