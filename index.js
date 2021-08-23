const {main} = require('./src/queries')
const validateEmail = require('email-validator');
const {renderLogo} =  require ('./src/logo');



function init() { 
    console.log(`Connected to the employees_db database.` .bgBlue) 
    renderLogo();
    main();
}

init()

