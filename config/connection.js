require('dotenv').config();
const util = require("util");
const colors = require('colors');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME  
},
console.log(`Connected to the employees_db database.` .bgBlue)
);

db.connect((err) => {
  if (err) throw err;
}); 

// db.query = util.promisify(db.query).bind(db);

module.exports = db;
