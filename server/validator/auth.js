

const { check } = require("express-validator");

exports.userSignupValidator =  [
    check('name')
        .not()
        .isEmpty()
        .withMessage('name is required'),
    check('name')
    .isLength({ min: 4, max: 10 })
    .withMessage("Name must be between 4 and 10 characters"),   
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')

    ]
    
