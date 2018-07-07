const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../models/User');
const localConfig = require('../../../localConfig');

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

module.exports = router;
