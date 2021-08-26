const logo = require('asciiart-logo');

const longText = `
Welcome to the Employee Tracker. This  is a command-line application to manage 
a company's employee database, using Node.js, Inquirer, and MySQL.`

function renderLogo() {
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
    .render()
    ) 
};

module.exports = {renderLogo};