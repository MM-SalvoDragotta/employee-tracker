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


module.exports = {startQuestions};