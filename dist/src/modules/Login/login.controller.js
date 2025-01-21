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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = exports.loginPage = void 0;
const Database_1 = require("../../../Database");
const loginPage = (req, res) => {
    res.render('login', { error: req.query.error, session: null, authentication: null });
};
exports.loginPage = loginPage;
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    //compare
    let userExist = yield Database_1.User.findOne({ email });
    if (!userExist || !userExist.password == password) {
        return res.redirect('/login?error=Incorrect Email Or Password');
    }
    req.session.isLogged = true;
    req.session.userId = userExist._id.toString();
    req.session.userName = userExist.name;
    res.redirect('/message');
});
exports.handleLogin = handleLogin;
