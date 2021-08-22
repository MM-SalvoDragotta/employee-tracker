require('dotenv').config();
const util = require("util");
const colors = require('colors');
const figlet = require('figlet');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME  
},
console.log(`Connected to the employees_db database.` .bgBlue)
);

// Connect to the DB
db.connect((err) => {
  if (err) throw err;   
  figlet.text('Employee  Tracker' , 
  {
      verticalLayout: 'full'  
  },
 (err, data) => {
    if (err) {
      console.log('ascii art not loaded');
    } else {
      console.log(data);
    }  
  //   startPrompt();
  });
});

db.query = util.promisify(db.query);

module.exports = db;
