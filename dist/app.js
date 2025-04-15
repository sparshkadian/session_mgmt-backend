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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const public_routes_1 = __importDefault(require("./routes/public.routes"));
const private_routes_1 = __importDefault(require("./routes/private.routes"));
const RequestLogger_1 = __importDefault(require("./lib/RequestLogger"));
const NoPathMatch_1 = __importDefault(require("./lib/NoPathMatch"));
const globalErrorHandler_1 = __importDefault(require("./lib/globalErrorHandler"));
const env_1 = require("./config/env");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
mongoose_1.default.set('strictQuery', true);
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json());
app.use(RequestLogger_1.default);
app.use('/api/auth', public_routes_1.default);
app.use('/api', private_routes_1.default);
app.use(NoPathMatch_1.default);
app.use(globalErrorHandler_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.env.DATABASE_URL);
        console.log('DB Connection successful');
        app.listen(env_1.env.PORT, () => {
            console.log(`Server running on http://localhost:${env_1.env.PORT}`);
        });
    }
    catch (err) {
        console.error('Error connecting to Database: ', err);
        process.exit(1);
    }
});
startServer();
