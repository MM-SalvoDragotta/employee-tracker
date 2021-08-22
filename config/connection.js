require('dotenv').config();
const util = require("util");
const colors = require('colors');
const figlet = require('figlet');
const mysql = require('mysql2');
const logo = require('asciiart-logo');

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME  
},
console.log(`Connected to the employees_db database.` .bgBlue)
);

const longText = `
Welcome to Employee Tracker. This  is a command-line application to manage 
a company's employee database, using Node.js, Inquirer, and MySQL.`

db.connect((err) => {
  if (err) throw err;   
  console.log(
    logo({
      name: 'Employee Tracker',
      font: 'Standard',
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: 'grey',
      logoColor: 'bold-green',
      textColor: 'green',
    })
    .emptyLine()
    .right('version 1.0.0')
    .emptyLine()
    .center(longText)
    .render()) 
});

db.query = util.promisify(db.query);

module.exports = db;
