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
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.urlencoded)({
    extended: true
}));
app.use((0, body_parser_1.json)());
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.MONGO_URI)
        throw new Error('MONGO_URI is required');
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
    }
    catch (err) {
        throw new Error('database error!');
    }
    app.listen(8000, () => {
        console.log("server is running on port 8k");
    });
});
start();
