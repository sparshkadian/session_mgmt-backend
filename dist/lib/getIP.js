"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIP(req) {
    return req.ip || req.headers['x-forwared-for'];
}
exports.default = getIP;
