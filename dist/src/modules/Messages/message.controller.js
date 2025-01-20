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
exports.messagePage = void 0;
const Database_1 = require("../../../Database");
const qrcode_1 = __importDefault(require("qrcode"));
//second step and third 
const messagePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = `${req.protocol}://${req.get('host')}/user/${req.session.userId}`;
    let qrCodeUrl;
    // With promises
    yield qrcode_1.default.toDataURL(url)
        .then(url => {
        qrCodeUrl = url;
        console.log(url);
    })
        .catch(err => {
        console.error(err);
    });
    let messages = yield Database_1.Message.find({ user: req.session.userId });
    if (req.session.isLogged) {
        res.render('message', { session: req.session, url, qrCodeUrl, messages });
    }
    else {
        res.redirect('/login');
    }
});
exports.messagePage = messagePage;
