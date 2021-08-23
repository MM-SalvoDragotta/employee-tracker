//https://www.npmjs.com/package/colors
const colors = require('colors');

const startQuestions = [
    {
    type: 'rawlist',
    message: 'What would you like to do?' .brightMagenta,   
    choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add A Role',        
        'View All Departments',        
        'Add Department',       
        'Exit'
    ],
    pageSize: 12,
    name: 'start'
}];

const addEmployeeQuestions =  (roles, managers) =>  [
    {
    type: "input",
    message: "Employee's first name?",
    name: "first_name",
    },
    {
    type: "input",
    message: "Employee's last name?",
    name: "last_name",
    },
    {
    type: "list",
    message: "Employee's role?",
    name: "role_id",
    choices: roles,
    pageSize: 12
    },
    {
    type: "list",
    message: "Employee's manager?",
    name: "manager_id",
    choices: managers,
    pageSize: 12
    }
];

module.exports = {startQuestions , addEmployeeQuestions};