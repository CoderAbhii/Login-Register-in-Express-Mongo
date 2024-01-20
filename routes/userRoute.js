const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { userRegisterAuthValidation, userLoginAuthValidation} = require('../validations/userValidation');
const router = express.Router();

router.post('/register', userRegisterAuthValidation, registerUser);

router.post('/login', userLoginAuthValidation, loginUser);


module.exports = router