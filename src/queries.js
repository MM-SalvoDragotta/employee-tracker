const db = require('../config/connection')
const cTable = require('console.table');
const util = require("util");
//Include packages needed for this application
const inquirer = require("inquirer");
const {startQuestions , addEmployeeQuestions , updateEmployeeRoleQuestions, addRoleQuestions , addDepartmentQuestions} = require ('./questions');
// const Choices = require('inquirer/lib/objects/choices');
var clear = require("cli-clear");
const {renderLogo} =  require ('./logo');

// node native promisify
//https://stackoverflow.com/questions/56242450/use-async-with-nodejs-mysql-driver
const query = util.promisify(db.query).bind(db);

async function refresh(){
    await renderLogo();
    await main();           
    clear();      
}

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
            updateEmployeeRole();
            break;
        case "View All Roles":
            viewAllRoles();
            break;
        case "Add A Role":
            addRole();
            break;
        case "View All Departments":
            viewAllDepartments();
            break;
        case "Add Department":
            addDepartment();
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
    refresh(); 
    } catch (err){
        console.log(err)
    }
}

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
        refresh();         
        } catch (err){
            console.log(err)
        }
}

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
        refresh();  
        } catch (err){
            console.log(err)
        }
}

async function addEmployee() {
    await renderLogo();
    try {
        const managers = await query(`
            SELECT 
                id AS value, 
                CONCAT(first_name, ' ', last_name) AS name        
            FROM employee
            ORDER BY employee.first_name ASC
      `); 
        managers.push(">>>None<<<")

        const roles = await query(`
            SELECT 
                id AS value, 
                title AS name        
            FROM role
            ORDER BY role.title ASC
      `); 
        
        // await console.table(roles);
        // await console.table(managers);
        const choice =  await inquirer.prompt(addEmployeeQuestions( roles , managers ));
        if (choice.manager_id === ">>>None<<<") {
            choice.manager_id = null;
        }
        // console.log(choice)
        await query(`
        INSERT INTO employee SET ?                 
      ` , choice);
        await console.log(`New employee ${choice.first_name} ${choice.last_name} added successfully!` .bgGreen);
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        await clear(); 
        refresh(); 
    } catch (err){
        console.log(err)
    }
}

async function updateEmployeeRole() {
    try {
        const employees = await query(`
            SELECT 
                employee.id AS value, 
                CONCAT(first_name, ' ', last_name , ' -  CURRENT ROLE: ', role.title ) AS name, 
                role.title AS 'Role'     
            FROM employee
            INNER JOIN role ON (employee.role_id = role.id) 
            ORDER BY employee.first_name ASC
      `);         
        // await console.table(employees);
        const roles = await query(`
            SELECT 
                id AS value, 
                title AS name        
            FROM role
            ORDER BY role.title ASC
      `); 
        
        const choice =  await inquirer.prompt(updateEmployeeRoleQuestions( employees , roles ));   
        // console.log(choice)
        await query(`
            UPDATE employee SET ? WHERE ?                
      ` , [ {
            role_id : choice.role_id 
            },
            {                
            id :choice.id  
            }          
        ]);
        await console.log(`Employee Role updated successfully!` .bgGreen);
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        await clear(); 
        refresh(); 
    } catch (err){
        console.log(err)
    }
}

async function addRole() {
    try {
        const departments = await query(`
            SELECT 
                id AS value, 
                name       
            FROM department    
        `);
        const choice =  await inquirer.prompt(addRoleQuestions(departments)); 
        await query(`
            INSERT INTO role SET ?                
            ` ,  {
                    title: choice.title,
                    salary: choice.salary,
                    department_id: choice.department_id  
                    }          
                );
        await console.log(`New Role added successfully!` .bgGreen);
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        await clear(); 
        refresh(); 
    } catch (err){
        console.log(err)
    }                   
}

async function addDepartment(){
    try {
        const choice =  await inquirer.prompt(addDepartmentQuestions);         
        await query(`
            INSERT INTO department SET ?               
            ` ,  {
                    name: choice.name                   
                }          
            );
        await console.log(`Department "${choice.name}" added successfully!` .bgGreen);
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        await clear(); 
        refresh(); 
    } catch (err){
        console.log(err)
    }              
}

module.exports = {main};