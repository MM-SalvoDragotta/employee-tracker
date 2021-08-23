const db = require('../config/connection')
const cTable = require('console.table');
const util = require("util");
//Include packages needed for this application
const inquirer = require("inquirer");
//https://www.npmjs.com/package/colors
const colors = require('colors');
const {startQuestions , addEmployeeQuestions} = require ('./questions');

// node native promisify
const query = util.promisify(db.query).bind(db);

async function main() {
    const choice =  await inquirer.prompt(startQuestions);
    switch (choice.start) {
        case "View All Employees":
            viewAllEmployees();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Update Employee Role":
            // updateEmployeeRole();
            break;
        case "View All Roles":
            viewAllRoles();
            break;
        case "Add A Role":
            // addRole();
            break;
        case "View All Departments":
            viewAllDepartments();
            break;
        case "Add Department":
            // addDepartment();
            break;
        case "Exit":
            console.log(`Disconnected from the employees_db database.` .bgBlue);
            db.end();            
            process.exit();
            break;
    }
}

async function viewAllEmployees() {
    try {
    const q = await query(`
        SELECT 
            employee.id AS ID, 
            CONCAT (employee.first_name,' ', employee.last_name) AS 'Full Name', 
            role.title AS 'Role', 
            department.name AS Department, 
            role.salary AS Salary, 
            CONCAT (managers.first_name,' ', managers.last_name) AS 'Manager'
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

async function viewAllRoles() {
    try {
        const q = await query(`
        SELECT 
            role.id AS ID, 
            role.title AS 'Role',  
            role.salary AS Salary, 
            name AS Department
        FROM role 
        INNER JOIN department ON (role.department_id = department.id)
        ORDER BY role.title ASC
      `);   
        await console.table(q);
        main(); 
        } catch (err){
            console.log(err)
        }
};

async function viewAllDepartments() {
    try {
        const q = await query(`
        SELECT 
            department.id AS ID, 
            department.name AS Department
        FROM department         
        ORDER BY department.name ASC
      `);   
        await console.table(q);
        main(); 
        } catch (err){
            console.log(err)
        }
};

async function addEmployee() {
    try {
        const managers = await query(`
        SELECT 
            id AS value, 
            CONCAT(first_name, ' ', last_name) AS name        
        FROM employee
        ORDER BY employee.first_name ASC
      `); 
        const roles = await query(`
        SELECT 
            id AS value, 
            title AS name        
        FROM role
        ORDER BY role.title ASC
      `); 
        roles.push(NaN)
        // await console.table(roles);
        // await console.table(managers);
        const choice =  await inquirer.prompt(addEmployeeQuestions( roles , managers ));
        await query(`
        INSERT INTO employee SET ?                 
      ` , choice);
        await console.log(`${choice.first_name} ${choice.last_name} added successfully!` .bgGreen);
        main(); 
        } catch (err){
            console.log(err)
        }
};

module.exports = {main};