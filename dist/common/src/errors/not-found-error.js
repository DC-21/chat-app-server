"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_error_1 = require("./custom-error");
class NotFoundError extends custom_error_1.CustomError {
    constructor(message) {
        super('not found');
        this.message = message;
        this.statusCode = 404;
    }
    generateErrors() {
        return [{ message: 'not found' }];
    }
}
exports.NotFoundError = NotFoundError;
