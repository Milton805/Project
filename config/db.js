//Have to explicitly call out credentials and URI for database connections. Not taking appropriately form .env

const mysql = require('mysql2');
const mongoose = require('mongoose');

// MySQL Connection
const mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: 'root',
    password: '',
    database: process.env.MYSQL_DB
});

mysqlConnection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// MongoDB Connection
console.log("MongoDB URI:", 'mongodb://localhost:27017/notesapp');
mongoose.connect('mongodb://localhost:27017/notesapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


module.exports = { mysqlConnection };
