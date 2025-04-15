"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardDetails = void 0;
const AppError_1 = __importDefault(require("../lib/AppError"));
const getDashboardDetails = (req, res, next) => {
    try {
    }
    catch (error) {
        console.error(error);
        return next(new AppError_1.default(error.message || 'Internal Server Error', 500));
    }
};
exports.getDashboardDetails = getDashboardDetails;
