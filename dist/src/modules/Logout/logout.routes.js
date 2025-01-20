"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logout_controller_1 = require("./logout.controller");
const logoutRouter = (0, express_1.Router)();
logoutRouter.get('/logout', logout_controller_1.logout);
exports.default = logoutRouter;
