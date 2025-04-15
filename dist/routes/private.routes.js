"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateSession_middleware_1 = __importDefault(require("../middleware/validateSession.middleware"));
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const profile_controller_1 = require("../controllers/profile.controller");
const logout_controller_1 = require("../controllers/logout.controller");
const router = express_1.default.Router();
router.use(validateSession_middleware_1.default);
// Dashboard Routes
router.get('/dashboard', dashboard_controller_1.getDashboardDetails);
// Profile Routes
router.get('/profile', profile_controller_1.getProfileDetails);
// Logout Routes
router.get('/logout', logout_controller_1.logout);
router.get('/logout-all', logout_controller_1.logoutAllDevices);
router.get('/sessions', logout_controller_1.getSessionDetails);
exports.default = router;
