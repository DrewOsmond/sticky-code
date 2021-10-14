"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const users_1 = require("../db/controllers/users");
const Notes_1 = require("../db/controllers/Notes");
const router = express_1.Router();
router.post("/register", express_async_handler_1.default(async (req, res) => {
    await users_1.Users.signup(req, res);
}));
router.post("/login", express_async_handler_1.default(async (req, res) => {
    await users_1.Users.login(req, res);
}));
router.get("/restore", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    req.body.user
        ? res.send(req.body.user)
        : res.status(500).send("something went wrong");
}));
router.delete("/logout", (_req, res) => {
    res.clearCookie("token");
    res.status(204).send("success");
});
router.post("/add-favorite-note", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await Notes_1.Notes.addFavoriteNotes(req, res);
}));
router.delete("/remove-favorite-note", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await Notes_1.Notes.removeFavoriteNotes(req, res);
}));
router.get("/profile/:user", express_async_handler_1.default(async (req, res) => {
    await users_1.Users.getProfile(req, res);
}));
exports.default = router;
//# sourceMappingURL=users.js.map