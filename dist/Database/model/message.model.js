"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
//schema 
const messageSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true
    },
    user: String
});
//model
exports.Message = (0, mongoose_1.model)('Message', messageSchema);
