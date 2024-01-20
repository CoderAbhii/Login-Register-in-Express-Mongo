exports.createUserResponse = (res, user, authenticationToken, dateCreated) =>{
    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user,
        authenticationToken,
        dateCreated,
      });
}
exports.loginUserResponse = (res, user, authenticationToken) => {
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    authenticationToken
});
}
exports.invalidCredentialsResponse = (res) =>{
  res.status(401).json({
    success: false,
    message: "Invalid credential",
  });
}
exports.internalServerErrorResponse = (res, error) => {
    res.status(500).json({
        success: false,
        errorMessage: "Internal Server Error",
        errorCause: error.message,
      });
}
