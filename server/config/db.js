require("dotenv").config();

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
});

db.getConnection()
  .then((connection) => {
    console.log("Connected to the MySQL database");
    connection.release(); // Return connection to the pool
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

module.exports = db;