const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY || '$2b$10$gsHv1d/F17zS0mpTd/v.tuBfVFW6/0QJkbWPTKAz5enplP9nTNTQS';

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
        jwt.verify(token, jwtSecretKey, (err, decoded) => {
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