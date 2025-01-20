"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.registerRouter = exports.messageRouter = exports.logoutRouter = exports.loginRouter = exports.homeRouter = void 0;
const home_routes_1 = __importDefault(require("./Home/home.routes"));
exports.homeRouter = home_routes_1.default;
const login_routes_1 = __importDefault(require("./Login/login.routes"));
exports.loginRouter = login_routes_1.default;
const logout_routes_1 = __importDefault(require("./Logout/logout.routes"));
exports.logoutRouter = logout_routes_1.default;
const message_routes_1 = __importDefault(require("./Messages/message.routes"));
exports.messageRouter = message_routes_1.default;
const register_routes_1 = __importDefault(require("./Register/register.routes"));
exports.registerRouter = register_routes_1.default;
const user_routes_1 = __importDefault(require("./User/user.routes"));
exports.userRouter = user_routes_1.default;
