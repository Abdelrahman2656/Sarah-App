"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_controller_1 = require("./home.controller");
const homeRouter = (0, express_1.Router)();
homeRouter.get('/', home_controller_1.homePage);
exports.default = homeRouter;
