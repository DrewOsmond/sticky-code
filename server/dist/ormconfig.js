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
Object.defineProperty(exports, "__esModule", { value: true });
const PostgressConnectionStringParser = __importStar(require("pg-connection-string"));
const databaseUrl = process.env.DATABASE_URL || "localhost";
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
module.exports = {
    type: "postgres",
    name: connectionOptions.user,
    host: connectionOptions.host,
    port: connectionOptions.port,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    synchronize: false,
    logging: false,
    emitDecoratorMetadata: true,
    extra: { ssl: "require" },
    entities: ["dist/db/entity/**/*.js"],
    migrations: ["dist/db/migration/**/*.js"],
    subscribers: ["dist/db/subscriber/**/*.js"],
    cli: {
        entitiesDir: "src/db/entity",
        migrationsDir: "src/db/migration",
        subscribersDir: "src/db/subscriber",
    },
};
//# sourceMappingURL=ormconfig.js.map