const express = require('express');

const router = express.Router();
const Advertisement = require('../../../models/Advertisement');

router.get('/', async (req, res, next) => {
    try {
        const {
            name, sell, tags, price, fields, sort,
        } = req.query;

        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);

        // empty filter
        const filter = {};

        if (name) {
            filter.name = name;
        }

        if (sell) {
            filter.sell = sell;
        }

        if (tags) {
            filter.tags = tags;
        }

        if (price) {
            filter.price = price;
        }


        const advertisements = await Advertisement.list(filter, skip, limit, fields, sort);
        res.json({ success: true, results: advertisements });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
