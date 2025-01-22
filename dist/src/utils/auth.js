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
exports.isLoggedIn = void 0;
const passport_google_oauth2_1 = require("passport-google-oauth2");
const passport_1 = __importDefault(require("passport"));
const Database_1 = require("../../Database");
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve('./config/.env') });
// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        // User is not logged in, redirect to the login page
        res.redirect('/login');
    }
};
exports.isLoggedIn = isLoggedIn;
// Define the Google OAuth2 strategy
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://sarah-app-gamma.vercel.app/google/callback",
    passReqToCallback: true,
}, (request, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log('Google Profile:', profile);
        // Find or create a user in the database
        const user = yield Database_1.User.findOrCreate({ googleId: profile.id }, // Conditions to find the user
        {
            googleId: profile.id,
            name: profile.displayName,
            email: (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value,
        } // Data to create the user if not found
        );
        // Set session data
        request.session.isLogged = true;
        request.session.userId = user._id.toString();
        request.session.userName = user.name;
        console.log('Session data set:', request.session);
        // Pass the user to Passport
        return done(null, user);
    }
    catch (err) {
        console.error('Error in Google strategy:', err);
        return done(err);
    }
})));
// Serialize and deserialize user
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
    // Serialize the user ID
});
passport_1.default.deserializeUser((id, done) => {
    Database_1.User.findById(id)
        .then((user) => {
        done(null, user); // Deserialize the user object
    })
        .catch((err) => {
        done(err, null); // Handle errors
    });
});
// Define the router for Google authentication
const router = (0, express_1.Router)();
// Route to initiate Google authentication
router.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// Google callback route
router.get("/google/callback", passport_1.default.authenticate("google", { successRedirect: '/message', failureRedirect: "/login" }));
exports.default = router;
