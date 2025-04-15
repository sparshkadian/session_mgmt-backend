"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileDetails = void 0;
const AppError_1 = __importDefault(require("../lib/AppError"));
const getProfileDetails = (req, res, next) => {
    try {
        const { username, email, avatar_url, createdAt } = req.user;
        res.status(200).json({
            username,
            email,
            avatar_url,
            createdAt: new Date(createdAt).toLocaleDateString(),
        });
    }
    catch (error) {
        console.error(error);
        return next(new AppError_1.default(error.message || 'Internal Server Error', 500));
    }
};
exports.getProfileDetails = getProfileDetails;
