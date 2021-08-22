//Include packages needed for this application
const inquirer = require("inquirer");
//https://www.npmjs.com/package/colors
const colors = require('colors');

const validateEmail = require('email-validator');
const consoleTable = require("console.table");
const mysql = require('mysql2');
const figlet = require('figlet');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME  
  },
  console.log(`Connected to the employees_db database.`)
  );

// Connect to the DB
db.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    figlet('Employee tracker', function(err, data) {
      if (err) {
        console.log('ascii art not loaded');
      } else {
        console.log(data);
      }  
    //   startPrompt();
    });
  });