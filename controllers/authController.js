// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = (req, res) => {
    const { username, email, password } = req.body;
    User.createUser(username, email, password, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error registering user' });
        res.status(201).json({ message: 'User registered successfully' });
    });
};

// Login an existing user
exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findUserByEmail(email, (err, user) => {
        if (err || !user) return res.status(400).json({ message: 'User not found' });

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        });
    });
};
