const express = require('express');

const router = express.Router();
const Advertisement = require('../../../models/Advertisement');

router.get('/', async (req, res, next) => {
    try {
        const advertisements = await Advertisement.find().exec();
        res.json({ success: true, results: advertisements });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
