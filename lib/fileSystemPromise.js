const fs = require('fs');
const util = require('util');

/**
 * With the arrival of Node.js V8, 'util.promisify()' alllowed us to convert I/O functions
 * that return callbacks into I/O functions that return promises.
 */
module.exports.readFilePromise = util.promisify(fs.readFile);
