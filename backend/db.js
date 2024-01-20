const { Pool } = require('pg');
require('dotenv').config(); // пакет для чтения из файла .env
console.log('POOL DB JS SERVER ! ')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})
console.log("POOL IMPORT process.env.DB_USER ! " ) 

// pool.query('SELECT NOW()').then() //x => console.log(x)

module.exports = pool;
