"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
function noRouteMatch(req, res, next) {
    return next(new AppError_1.default(`Path ${req.originalUrl} does not exist on this server`, 404));
}
exports.default = noRouteMatch;
