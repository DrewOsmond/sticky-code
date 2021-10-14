"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const search_1 = require("../db/controllers/search");
const router = express_1.Router();
router.get("/:searchterm", express_async_handler_1.default(async (req, res) => {
    const searchterm = req.params.searchterm;
    search_1.Searches.searchNotes(res, [searchterm]);
}));
router.get("/posts/recent", express_async_handler_1.default(async (_req, res) => {
    await search_1.Searches.getRecent(res);
}));
exports.default = router;
//# sourceMappingURL=search.js.map