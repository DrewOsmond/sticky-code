"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const users_1 = require("../db/controllers/users");
const collections_1 = require("../db/controllers/collections");
const router = express_1.Router();
router.post("/add", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await collections_1.Collections.addCollection(req, res);
}));
router.delete("/remove", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await collections_1.Collections.deleteCollection(req, res);
}));
router.put("/edit", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await collections_1.Collections.editCollection(req, res);
}));
router.get("/:user/:id", express_async_handler_1.default(async (req, res) => {
    await collections_1.Collections.getOne(req, res);
}));
router.post("/add-note", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await collections_1.Collections.addNoteToCollection(req, res);
}));
router.delete("/remove-note", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await collections_1.Collections.deleteNoteFromCollection(req, res);
}));
exports.default = router;
//# sourceMappingURL=collections.js.map