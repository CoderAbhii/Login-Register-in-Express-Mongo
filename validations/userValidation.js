const { body } = require('express-validator');

exports.userRegisterAuthValidation = [
    body('name', 'Enter your name').isLength({ min: 1 }),
    body('email', 'Enter your valid email').isEmail(),
    body('password', 'Password Must Be At Least 5 Characters').isLength({ min: 5 })
]

exports.userLoginAuthValidation = [
    body('email', 'Enter your valid email').isEmail(),
    body('password', 'Password Must Be At Least 5 Characters').isLength({ min: 5 })
]