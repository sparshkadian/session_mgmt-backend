"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requestLogger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}
exports.default = requestLogger;
