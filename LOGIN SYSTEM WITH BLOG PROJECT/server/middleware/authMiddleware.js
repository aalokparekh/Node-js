const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized access' });
            } else {
                req.user = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'No token found, authorization denied' });
    }
};
