const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../models/User');
const localConfig = require('../../../localConfig');

/**
 * POST /login
 * User authentication
 */
router.post('/login', async (req, res, next) => {
    try {
        // get credentials
        const { email, password } = req.body;

        // find in BD
        const user = await User.findOne({ email }).exec();

        // user no found
        if (!user) {
            res.json({ success: true, message: 'invalid credentials' });
            return;
        }

        // no password
        if (!password) {
            res.json({ success: true, message: 'invalid credentials' });
            return;
        }

        // check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.json({ success: true, message: 'invalid credentials' });
            return;
        }

        // create JWT
        jwt.sign({ user_id: user._id }, localConfig.jwt.secret, { expiresIn: localConfig.jwt.expiresIn }, (err, token) => {
            if (err) {
                next(err);
                return;
            }

            // return to client the JWT
            res.json({ success: true, token });
        });
    } catch (err) {
        next(err);
    }
});

/**
 * POST /register
 * User register
 */
router.post('/register', async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        if (email && password && name) {
            // verify if exist email
            const userExist = await User.findOne({ email }).exec();

            if (userExist) {
                res.json({ success: true, message: 'This email has registered already' });
                return;
            }

            // hash password with bcrypt
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(password, saltRounds);

            // create user
            await User.create({ email, password: hashPassword, name });

            // return success message
            res.json({ success: true, message: 'User has created successfully' });
        }
        const err = new Error('Error validation: no must exists empty fields');
        err.status = 401;
        throw err;
    } catch (err) {
        next(err);
    }
});

module.exports = router;
