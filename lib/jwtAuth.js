const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

// export a function that return a middleware for JWT verify
module.exports = function () {
    return (req, res, next) => {
        // get token request
        const token = req.query.token || req.body.token || req.get('x-access-token');

        // if there is not token, return 'no token provided'
        if (!token) {
            const err = new Error('no token provided');
            err.status = 401;
            next(err);
            return;
        }

        // verify token and allow next middleware
        jwt.verify(token, localConfig.jwt.secret, (err, decoded) => {
            if (err) {
                err.status = 401;
                next(err);
                return;
            }

            req.user_id = decoded.user_id;
            next();
        });
    }
}