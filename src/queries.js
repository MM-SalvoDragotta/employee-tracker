const db = require('../config/connection')
const cTable = require('console.table');
const util = require("util");
//Include packages needed for this application
const inquirer = require("inquirer");
//https://www.npmjs.com/package/colors
const colors = require('colors');
const {startQuestions} = require ('./questions')

// node native promisify
const query = util.promisify(db.query).bind(db);

async function main() {
    const choice =  await inquirer.prompt(startQuestions);
    switch (choice.start) {
        case "View All Employees":
            viewAllEmployees();
            break;
        case "Add Employee":
            // addEmployee();
            break;
        case "Update Employee Role":
            // updateEmployeeRole();
            break;
        case "View All Roles":
            // viewAllRoles();
            break;
        case "Add A Role":
            // addRole();
            break;
        case "View All Departments":
            // viewAllDepartments();
            break;
        case "Add Department":
            // addDepartment();
            break;
        case "Exit":
            console.log(`Disconnected from the employees_db database.` .bgBlue)
            db.end();            
            process.exit()
            break;
    }
}

async function viewAllEmployees() {
    try {
    const q = await query(`
    SELECT 
        employee.id, 
        CONCAT (employee.first_name,' ', employee.last_name) AS 'Employee Name', 
        role.title AS 'Role Title', 
        department.name AS Department, 
        role.salary AS Salary, 
        CONCAT (managers.first_name,' ', managers.last_name) AS 'Manager Name'
        FROM employee 
        INNER JOIN role ON (employee.role_id = role.id) 
        INNER JOIN department ON (department.id = role.department_id)
        LEFT JOIN employee AS managers ON (employee.manager_id = managers.id)
        ORDER BY employee.first_name ASC
  `);   
    await console.table(q);
    main(); 
    } catch (err){
        console.log(err)
    }
};

module.exports = {main};