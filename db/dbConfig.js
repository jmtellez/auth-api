require('dotenv').config();
const pg = require('pg').Pool;
const winston = require('winston')

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
}

const pool = new pg(dbConfig)
pool.on('error', function (err) {
    winston.error('idle client error', err.message, err.stack)
})

module.exports = {
    pool,
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}

// Test DB connection

// pool.query('SELECT * FROM users', (err, res) => {
//     if (err) {
//         winston.error(err.message)
//     } else {
//         winston.info(res.rows);
//     }
// })