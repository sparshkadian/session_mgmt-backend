"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateSession_middleware_1 = __importDefault(require("../middleware/validateSession.middleware"));
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const router = express_1.default.Router();
router.get('/', validateSession_middleware_1.default, dashboard_controller_1.getDashboardDetails);
exports.default = router;
