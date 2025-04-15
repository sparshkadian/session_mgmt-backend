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
const AppError_1 = __importDefault(require("../lib/AppError"));
const user_model_1 = require("../models/user.model");
const session_model_1 = require("../models/session.model");
const parseCookies_1 = __importDefault(require("../lib/parseCookies"));
function validateSession(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cookies = (0, parseCookies_1.default)(req.headers.cookie);
            const sid = cookies['sid'];
            if (!sid) {
                return next(new AppError_1.default('Session Id not present or expired', 401));
            }
            const session = yield session_model_1.Session.findOne({ _id: sid });
            if (!session) {
                return next(new AppError_1.default('Invalid Session id', 404));
            }
            const user = yield user_model_1.User.findOne({ _id: session.user }).select('-password');
            if (!user) {
                return next(new AppError_1.default('Invalid Session id', 404));
            }
            req.user = user;
            req.sid = sid;
            next();
        }
        catch (error) {
            console.log(error);
            return next(new AppError_1.default(error.message || 'Internal Server Error', 500));
        }
    });
}
exports.default = validateSession;
