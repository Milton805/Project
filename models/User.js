// models/User.js
const mysqlConnection = require('../config/db').mysqlConnection;
const bcrypt = require('bcryptjs');

const createUser = (username, email, password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return callback(err);

        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        mysqlConnection.query(query, [username, email, hashedPassword], (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        });
    });
};

const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    mysqlConnection.query(query, [email], (error, results) => {
        if (error) return callback(error);
        callback(null, results[0]);
    });
};

module.exports = { createUser, findUserByEmail };
