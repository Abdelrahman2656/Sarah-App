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
exports.User = void 0;
const mongoose_1 = require("mongoose");
// Define the User schema
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true, // Ensure emails are unique
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
        required: true,
        unique: true, // Ensure Google IDs are unique
    },
});
userSchema.statics.findOrCreate = function (conditions, doc) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield this.findOne(conditions); // Try to find the user
        if (!user) {
            user = yield this.create(doc); // If not found, create a new user
        }
        return user;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
