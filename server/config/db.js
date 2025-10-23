const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dorcas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

db.getConnection()
.then(() => console.log('Connected to the MySQL database'))
.catch((err) => {
    console.errror('Database connection failed:', err.message)
    process.exit(1)
})

module.exports = db;