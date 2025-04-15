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
exports.login = exports.signup = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const session_model_1 = require("../models/session.model");
const AppError_1 = __importDefault(require("../lib/AppError"));
const getDeviceDetails_1 = require("../lib/getDeviceDetails");
const env_1 = require("../config/env");
function sendResponse(res, sessionId, newUser) {
    if (newUser) {
        res
            .cookie('sid', sessionId, {
            httpOnly: true,
            secure: env_1.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        })
            .status(201)
            .json({ message: 'user created successfully' });
    }
    else {
        res
            .cookie('sid', sessionId, {
            httpOnly: true,
            secure: env_1.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        })
            .status(200)
            .json({ message: 'Login Successful' });
    }
}
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.create(req.body);
        const session = yield session_model_1.Session.create({
            user,
            Ip: (0, getDeviceDetails_1.getIP)(req),
            deviceType: (0, getDeviceDetails_1.getDeviceDetails)(req),
        });
        sendResponse(res, session.id, true);
    }
    catch (error) {
        console.error(error);
        return next(new AppError_1.default(error.message || 'Internal Server Error', 500));
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            return next(new AppError_1.default('No user found with this email', 404));
        }
        const comparePasswords = yield bcryptjs_1.default.compare(password, user.password);
        if (!comparePasswords) {
            return next(new AppError_1.default('Invalid Credentials', 404));
        }
        const sessionCount = yield session_model_1.Session.find({
            user: user.id,
        });
        if (sessionCount.length === 3) {
            return next(new AppError_1.default('Max Sessions Reached. Log out from a device to continue', 429));
        }
        const session = yield session_model_1.Session.create({
            user: user.id,
            Ip: (0, getDeviceDetails_1.getIP)(req),
            deviceType: (0, getDeviceDetails_1.getDeviceDetails)(req),
        });
        sendResponse(res, session.id, false);
    }
    catch (error) {
        console.error(error);
        return next(new AppError_1.default(error.message || 'Internal Server Error', 500));
    }
});
exports.login = login;
