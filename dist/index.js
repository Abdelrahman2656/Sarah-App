"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const bootstrap_1 = require("./src/bootstrap");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//config env
//public file
app.use(express_1.default.static((0, path_1.join)((0, path_1.resolve)(), 'public')));
app.use('/views', express_1.default.static((0, path_1.join)((0, path_1.resolve)(), 'views')));
app.set("view engine", "ejs");
// bootstrap
(0, bootstrap_1.bootstrap)(app, express_1.default);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
