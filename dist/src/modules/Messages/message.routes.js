"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("./message.controller");
const auth_1 = require("../../utils/auth");
const messageRouter = (0, express_1.Router)();
messageRouter.get('/message', auth_1.isLoggedIn, message_controller_1.messagePage);
exports.default = messageRouter;
