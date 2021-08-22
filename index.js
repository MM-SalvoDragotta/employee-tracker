//Include packages needed for this application
const inquirer = require("inquirer");
//https://www.npmjs.com/package/colors
const colors = require('colors');

const validateEmail = require('email-validator');
const consoleTable = require("console.table");
const mysql = require('mysql2');
const figlet = require('figlet');
require('dotenv').config();
const util = require("util");

const db = require('./config/connection')



