const {main} = require('./src/queries')
const validateEmail = require('email-validator');
const {renderLogo} =  require ('./src/logo');



function init() {  
    renderLogo();
    main();
}

init()

