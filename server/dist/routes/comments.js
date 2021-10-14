"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const users_1 = require("../db/controllers/users");
const comments_1 = require("../db/controllers/comments");
const router = express_1.Router();
router.post("/add", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await comments_1.Comments.addComments(req, res);
}));
router.delete("/delete", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await comments_1.Comments.deleteComment(req, res);
}));
router.put("/update", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await comments_1.Comments.updateComment(req, res);
}));
exports.default = router;
//# sourceMappingURL=comments.js.map