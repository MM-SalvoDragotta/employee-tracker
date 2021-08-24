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
    message: "Employee's first name?" .brightMagenta,
    name: "first_name",
    },
    {
    type: "input",
    message: "Employee's last name?" .brightMagenta,
    name: "last_name",
    },
    {
    type: "list",
    message: "Employee's role?" .brightMagenta,
    name: "role_id",
    choices: roles,
    pageSize: 15
    },
    {
    type: "list",
    message: "Employee's manager?" .brightMagenta,
    name: "manager_id",
    choices: managers,
    pageSize: 50
    }
];

const updateEmployeeRoleQuestions =  (employees , roles) =>  [
    {
    type: "list",
    message: "What employee's role would you like to update?" .brightMagenta,
    name: "id",
    choices: employees,
    pageSize: 50
    },
    {
    type: "list",
    message: "New role?" .brightMagenta,
    name: "role_id",
    choices: roles,
    pageSize: 15
    }   
];

const addRoleQuestions =  (department) =>  [
    {
    type: "input",
    message: "What is the new role Title?" .brightMagenta,
    name: "title",    
    },
    {
        type: "input",
        message: "What is the new role Salary?",
        name: "salary",
    },
    {
    type: "list",
    message: "What is the new role Department?" .brightMagenta,
    name: "department_id",
    choices: department,
    pageSize: 15
    }   
];


module.exports = {startQuestions , addEmployeeQuestions , updateEmployeeRoleQuestions , addRoleQuestions};