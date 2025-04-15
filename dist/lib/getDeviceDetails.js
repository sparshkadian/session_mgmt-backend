"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceDetails = exports.getIP = void 0;
const ua_parser_js_1 = require("ua-parser-js");
const getIP = (req) => {
    return req.ip || req.headers['x-forwared-for'];
};
exports.getIP = getIP;
const getDeviceDetails = (req) => {
    const parser = new ua_parser_js_1.UAParser(req.headers['user-agent']);
    return parser.getDevice().type || 'desktop';
};
exports.getDeviceDetails = getDeviceDetails;
