"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Notes_1 = require("../db/controllers/Notes");
const users_1 = require("../db/controllers/users");
const router = express_1.Router();
router.get("/get/:id", express_async_handler_1.default(async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id))
        res.status(404).send("not found");
    await Notes_1.Notes.getNote(id, res);
}));
router.post("/add", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await Notes_1.Notes.addNote(req, res);
}));
router.put("/update", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await Notes_1.Notes.updateNote(req, res);
}));
router.delete("/delete", users_1.Users.verifyUser, express_async_handler_1.default(async (req, res) => {
    await Notes_1.Notes.deleteNote(req, res);
}));
exports.default = router;
//# sourceMappingURL=notes.js.map