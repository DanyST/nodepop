const mongoose = require('mongoose');

// schema define
const advertisementSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
    tags: [String],
});

// add static method to advertisement Schema
advertisementSchema.statics.list = function (filter, skip, limit, fields, sort) {

    // Single responsibility principle (SRP)
    if (filter.name) {
        filter.name = new RegExp(`^${filter.name}`, 'i');
    }

    if (filter.price) {
        // use basic regex (\d+) this will match only digits.
        // match return a array with digits

        if (filter.price.startsWith('-')) { // 'less than' price
            const [priceRange] = filter.price.match(/\d+/g); 
            filter.price = { $lte: priceRange };
            
        } else if (filter.price.endsWith('-')) { // 'greater than' price
            const [priceRange] = filter.price.match(/\d+/g);
            filter.price = { $gte: priceRange };

        } else if (filter.price.includes('-')) { // price range
            const [firstPrice, secondPrice] = filter.price.match(/\d+/g);
            filter.price = { $gte: firstPrice, $lte: secondPrice };

        }else { // equal price
            const [price] = filter.price.match(/\d+/g);
            filter.price = price;
        }
    }

    // query create without exec
    const query = Advertisement.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort); // the sort is executed before skip and limit

    // query exec and return a Promise
    return query.exec();
};

// model create
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
