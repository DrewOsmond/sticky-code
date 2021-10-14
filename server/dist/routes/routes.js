"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const search_1 = __importDefault(require("./search"));
const notes_1 = __importDefault(require("./notes"));
const comments_1 = __importDefault(require("./comments"));
const collections_1 = __importDefault(require("./collections"));
const routes = express_1.Router();
routes.use("/users", users_1.default);
routes.use("/search", search_1.default);
routes.use("/notes", notes_1.default);
routes.use("/comments", comments_1.default);
routes.use("/collections", collections_1.default);
exports.default = routes;
//# sourceMappingURL=routes.js.map