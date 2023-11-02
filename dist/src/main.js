"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.urlencoded)({
    extended: true
}));
app.use((0, body_parser_1.json)());
const start = () => {
    mongoose_1.default.connect(process.env.MONGO_URI);
};
start();
app.listen(8000, () => {
    console.log("server is running on port 8k");
});
