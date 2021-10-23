"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes/routes"));
const typeorm_1 = require("typeorm");
const User_1 = require("./db/entity/User");
const Note_1 = require("./db/entity/Note");
const Comment_1 = require("./db/entity/Comment");
const Collection_1 = require("./db/entity/Collection");
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const router = express_1.default.Router();
dotenv.config();
const startConnection = async () => {
    await typeorm_1.createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [User_1.User, Note_1.Note, Comment_1.Comment, Collection_1.Collection],
        synchronize: false,
    });
    const port = process.env.PORT || 80;
    const app = express_1.default();
    app.listen(port, () => console.log(`listening on port: ${port}`));
    app.use(express_1.default.json());
    app.use(cors_1.default());
    app.use(cookie_parser_1.default());
    app.use(helmet_1.default());
    app.use(morgan_1.default("tiny"));
    app.use("/api", routes_1.default);
    if (process.env.NODE_ENV === "production") {
        app.get("/", (req, res) => {
            res.cookie("XSRF-TOKEN", req.csrfToken());
            res.sendFile(path_1.default.join(__dirname, "index.html"));
        });
        router.use(express_1.default.static(path_1.default.resolve("../../web", "build", "index.html")));
        app.get(/^(?!\/?api).*/, (req, res) => {
            res.cookie("XSRF-TOKEN", req.csrfToken());
            res.sendFile(path_1.default.join(__dirname, "../../web", "build", "index.html"));
        });
    }
};
startConnection()
    .then(() => console.log("connection to DB started"))
    .catch(console.error);
//# sourceMappingURL=server.js.map