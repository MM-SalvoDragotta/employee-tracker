require('dotenv').config();
const util = require("util");

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME  
},
console.log(`Connected to the employees_db database.`)
);

module.exports = db;
