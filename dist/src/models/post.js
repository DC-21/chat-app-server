"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    comments: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: 'Comment'
        },
    ],
});
const Post = mongoose_1.default.model('Post', postSchema);
exports.default = Post;
