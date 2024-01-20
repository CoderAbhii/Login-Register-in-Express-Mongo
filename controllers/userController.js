const User = require("../models/userModel.js");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createUserResponse, internalServerErrorResponse, loginUserResponse, invalidCredentialsResponse } = require("../utils/serverResponses.js");
const { validationResult } = require("express-validator");
const { handleValidationErrors } = require("../validations/validationHandler.js");

/**
 * @DESC Register A User Controller
 */
exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleValidationErrors(res, errors);
    }
    const { name, email, password } = req.body;
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return userEmailCheckResponse(res);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const dateCreated = moment().format("LLL");
      const user = await User.create({ name, email, password: hashedPassword });
      const data = { user: { id: user.id } };
      const authenticationToken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      createUserResponse(res, user, authenticationToken, dateCreated);
    }
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};

/**
 * @DESC Login A User Controller
 */
exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleValidationErrors(res, errors);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return invalidCredentialsResponse(res);
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return invalidCredentialsResponse(res);
    }
    const data = { user: { id: user.id } };
    const authenticationToken = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    loginUserResponse(res, user, authenticationToken);
  } catch (error) {
    internalServerErrorResponse(res, error);
  }
};
