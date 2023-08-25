// Custom error class for "Not Found" errors
class NotFoundError {
    constructor(message) {
      this.message = message;
      this.status = 404;
    }
}
// Custom error class for "Not Authorized" errors
class NotAuthError {
    constructor(message) {
        this.message = message;
        this.status = 401;
    }
}

exports.NotFoundError = NotFoundError;
exports.NotAuthError = NotAuthError;