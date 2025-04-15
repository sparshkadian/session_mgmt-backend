"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionDetails = exports.logoutAllDevices = exports.logout = void 0;
const AppError_1 = __importDefault(require("../lib/AppError"));
const session_model_1 = require("../models/session.model");
const env_1 = require("../config/env");
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield session_model_1.Session.findByIdAndDelete(req.sid);
        res
            .cookie('sid', '', {
            maxAge: 0,
            path: '/',
            httpOnly: env_1.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })
            .status(200)
            .json({ message: 'Logged out successfully' });
    }
    catch (error) {
        console.error(error);
        return next(new AppError_1.default(error.message || 'Internal Server Error', 500));
    }
});
exports.logout = logout;
const logoutAllDevices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        yield session_model_1.Session.deleteMany({ user: userId });
        res
            .cookie('sid', '', {
            maxAge: 0,
            path: '/',
            httpOnly: env_1.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })
            .status(200)
            .json({ message: 'Logged out from all Devices.' });
    }
    catch (error) {
        console.error(error);
        return next(new AppError_1.default(error.message || 'Internal Server Error', 500));
    }
});
exports.logoutAllDevices = logoutAllDevices;
const getSessionDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessions = yield session_model_1.Session.find({ user: req.user.id }).select('deviceType createdAt');
        res.status(200).send(sessions);
    }
    catch (error) {
        console.error(error);
        return next(new AppError_1.default(error.message || 'Internal Server Error', 500));
    }
});
exports.getSessionDetails = getSessionDetails;
