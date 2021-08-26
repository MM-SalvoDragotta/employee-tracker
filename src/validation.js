const validator = require('validator');
const colors = require('colors');

const validation = {
    validateValue (value) {
        if (value && validator.isAlpha(value)) {
            return true;
        } else { 
            return "Please enter a valid value. It cannot be empty or contains numbers" .red;
        }
    }, 
    validateSalary (value){
        if (validator.isDecimal(value)) 
            return true;
        return 'Please enter a valid salary! (decimal numbers only)'.red;
    }

};

module.exports = validation;