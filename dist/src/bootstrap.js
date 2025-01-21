"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const dbconnection_1 = require("../Database/dbconnection");
const modules_1 = require("./modules");
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./utils/auth"));
let MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const bootstrap = (app, express) => {
    dotenv_1.default.config({ path: path_1.default.resolve('./config/.env') });
    //database connection
    (0, dbconnection_1.dbconnection)();
    app.use(express.urlencoded({ extended: true }));
    const store = new MongoDBStore({
        uri: process.env.BASE_DB || '',
        collection: "MyCollection"
    });
    app.use((0, express_session_1.default)({
        secret: process.env.SECRET_SESSION || 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store
    }));
    app.use((0, cors_1.default)({
        origin: '*',
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    // Use the auth router
    app.use(auth_1.default);
    app.use(modules_1.homeRouter);
    app.use(modules_1.loginRouter);
    app.use(modules_1.messageRouter);
    app.use(modules_1.registerRouter);
    app.use(modules_1.userRouter);
    app.use(modules_1.logoutRouter);
};
exports.bootstrap = bootstrap;
