"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("./login.controller");
const loginRouter = (0, express_1.Router)();
loginRouter.get('/login', login_controller_1.loginPage);
loginRouter.post('/handleLogin', login_controller_1.handleLogin);
exports.default = loginRouter;
