require('dotenv').config();
const mysql = require('mysql2');
const mongoose = require('mongoose');

// MySQL Test Connection
const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,           // This should be 'app_user' as per .env
    password: '',   // Empty, as per your .env
    database: process.env.MYSQL_DB
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL successfully!');
        mysqlConnection.end();  // Close connection after test
    }
});

// MongoDB Test Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
