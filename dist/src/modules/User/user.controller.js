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
exports.sendMsg = exports.userPage = void 0;
const Database_1 = require("../../../Database");
const qrcode_1 = __importDefault(require("qrcode"));
const userPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.session.userId || ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    let qrCodeUrl;
    let url = `${req.protocol}://${req.get('host')}/user/${userId}`;
    yield qrcode_1.default.toDataURL(url)
        .then(url => {
        qrCodeUrl = url;
        console.log(url);
    })
        .catch(err => {
        console.error(err);
        qrCodeUrl = null; // Set to null if QR code generation fails
    });
    if (req.isAuthenticated()) {
        res.render('user', { userId: req.params.id, url, qrCodeUrl, error: req.query.error, session: req.session, user: req.user, authentication: req.isAuthenticated() });
    }
    else {
        res.redirect('/login');
    }
});
exports.userPage = userPage;
const sendMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    // Validate the message
    if (!message || message.trim() === '') {
        return res.redirect(`/user/${req.params.id}?error=Message cannot be empty`);
    }
    req.body.user = req.params.id;
    yield Database_1.Message.insertMany(req.body);
    // Redirect to the user's profile page
    res.redirect(`/user/${req.params.id}`);
});
exports.sendMsg = sendMsg;
