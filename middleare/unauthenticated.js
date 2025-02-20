const {CustomAPIError} = require("../config/custom-errors")
const {StatusCodes} = require("http-status-codes")
class UnauthenticatedError extends CustomAPIError{
  constructor(message,statusCode){
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError