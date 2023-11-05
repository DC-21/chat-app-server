"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
const custom_error_1 = require("./custom-error");
class NotAuthorizedError extends custom_error_1.CustomError {
    constructor(message) {
        super('not authorized');
        this.message = message;
        this.statusCode = 401;
    }
    generateErrors() {
        return [{ message: 'not authorized' }];
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
