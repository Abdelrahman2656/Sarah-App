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
const Database_1 = require("../../../Database"); // Adjust the import path as needed
const qrcode_1 = __importDefault(require("qrcode"));
const messagePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = req.session.userId || ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    // Generate the URL for the QR code
    const url = `${req.protocol}://${req.get('host')}/user/${userId}`;
    // Generate the QR code
    let qrCodeUrl;
    try {
        qrCodeUrl = yield qrcode_1.default.toDataURL(url);
        console.log('QR Code URL:', qrCodeUrl);
    }
    catch (err) {
        console.error('Error generating QR code:', err);
        qrCodeUrl = null; // Set to null if QR code generation fails
    }
    // Fetch messages for the logged-in user
    const messages = yield Database_1.Message.find({ user: req.session.userId || ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id), });
    // Render the message page
    res.render('message', {
        session: req.session,
        user: req.user,
        url,
        qrCodeUrl,
        messages,
        authentication: req.isAuthenticated()
    });
});
exports.messagePage = messagePage;
