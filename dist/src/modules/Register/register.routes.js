"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = require("./register.controller");
const registerRouter = (0, express_1.Router)();
registerRouter.get('/register', register_controller_1.registerPage);
//signup
registerRouter.post('/handleRegister', register_controller_1.handleRegister);
exports.default = registerRouter;
