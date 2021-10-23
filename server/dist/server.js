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
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const csurf_1 = __importDefault(require("csurf"));
const connectionOptions = require("./ormconfig");
const router = express_1.default.Router();
dotenv.config();
const inProduction = process.env.NODE_ENV === "production";
const startConnection = async () => {
    await typeorm_1.createConnection(connectionOptions);
    const port = process.env.PORT || 80;
    const app = express_1.default();
    app.listen(port, () => console.log(`listening on port: ${port}`));
    app.use(express_1.default.json());
    app.use(cors_1.default());
    app.use(cookie_parser_1.default());
    app.use(helmet_1.default());
    app.use(csurf_1.default({
        cookie: {
            secure: inProduction,
            sameSite: inProduction && "Lax",
            httpOnly: true,
        },
    }));
    app.use(morgan_1.default("tiny"));
    app.use("/api", routes_1.default);
    if (process.env.NODE_ENV === "production") {
        console.log("production build");
        app.get("/", (req, res) => {
            res.cookie("XSRF-TOKEN", req.csrfToken());
            res.sendFile(path_1.default.join(__dirname, "index.html"));
        });
        router.use(express_1.default.static(path_1.default.resolve(__dirname, "../../web", "build", "index.html")));
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