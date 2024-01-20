exports.handleValidationErrors = (res, errors) => {
    return res.status(400).json({
      errors: errors.array(),
      nbErr: errors.array().length,
    });
  };