"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../config/env");
const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message || 'something went wrong',
        error: err,
        stack: err.stack,
    });
};
function sendProdError(err, res) {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message || 'something went wrong',
    });
}
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (env_1.env.NODE_ENV === 'development') {
        sendDevError(err, res);
    }
    if (env_1.env.NODE_ENV === 'production') {
        sendProdError(err, res);
    }
};
exports.default = globalErrorHandler;
