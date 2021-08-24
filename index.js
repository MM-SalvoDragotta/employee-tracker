const {main} = require('./src/queries')
const validateEmail = require('email-validator');
const {renderLogo} =  require ('./src/logo');
var clear = require("cli-clear");

async function init() { 
    await clear(); 
    await console.log(`Connected to the employees_db database.` .bgBlue); 
    await renderLogo();
    main();
}

init()

