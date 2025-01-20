"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get('/user/:id', user_controller_1.userPage);
userRouter.post('/sendMsg/:id', user_controller_1.sendMsg);
exports.default = userRouter;
