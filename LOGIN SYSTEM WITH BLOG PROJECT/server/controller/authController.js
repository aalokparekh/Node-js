const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Create JWT Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// User Sign Up
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({ user: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
            res.status(200).json({ user: user._id });
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
