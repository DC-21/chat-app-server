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
exports.signinRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.signinRouter = router;
const user_1 = __importDefault(require("../../models/user"));
const common_1 = require("../../../common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
router.post("/signin", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user)
        return next(new common_1.BadRequestError("no user with that email"));
    const isEqual = yield common_1.authenticationService.pwdCompare(user.password, password);
    if (!isEqual)
        return next(new common_1.BadRequestError("wrong password"));
    const token = jsonwebtoken_1.default.sign({ email, userId: user._id }, process.env.JWT_KEY, { expiresIn: '10h' });
    req.session = { jwt: token };
    res.status(200).send(user);
}));
