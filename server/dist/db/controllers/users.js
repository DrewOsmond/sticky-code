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
exports.Users = void 0;
const User_1 = require("../entity/User");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const errors_1 = require("./errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const inProduction = process.env.NODE_ENV === "production";
class Users {
    static createToken(res, user) {
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
            email: user.email,
        }, `${process.env.JWT_SECRET}`, {
            expiresIn: Number(process.env.JWT_EXPIRES_IN * 1000),
        });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: inProduction && "lax",
            secure: inProduction,
            maxAge: Number(process.env.JWT_EXPIRES_IN * 1000),
        });
        return token;
    }
}
exports.Users = Users;
Users.signup = async (req, res) => {
    const { username, email, password } = req.body;
    const strongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!(username && email && password)) {
        res.status(400).send("invalid information");
        return;
    }
    else if (!password.match(strongPassword)) {
        res.status(400).send("password is not secure");
        return;
    }
    const userTable = typeorm_1.getRepository(User_1.User);
    const user = new User_1.User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.favorite_notes = [];
    user.collections = [];
    const potentialErrors = await class_validator_1.validate(user);
    if (potentialErrors.length > 0) {
        const errors = errors_1.getValidationErrors(potentialErrors);
        res.json({
            id: 0,
            username: null,
            email: null,
            favorite_notes: [],
            collections: [],
            errors: errors,
        });
        return;
    }
    user.stringPasswordToHashed();
    const data = await userTable.save(user).catch((_e) => {
        res.json({
            id: 0,
            username: null,
            email: null,
            favorite_notes: [],
            collections: [],
            errors: ["Username or email already in use"],
        });
    });
    if (data) {
        Users.createToken(res, user);
        res.status(201).json(data);
    }
};
Users.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send("username or password is missing");
        return;
    }
    const user = await typeorm_1.createQueryBuilder(User_1.User, "user")
        .leftJoinAndSelect("user.favorite_notes", "favorite_notes")
        .leftJoinAndSelect("user.collections", "collections")
        .leftJoinAndSelect("collections.added_notes", "added_notes")
        .where("user.username =:username", { username })
        .getOne();
    if (!user) {
        res.json({
            id: 0,
            username: null,
            email: null,
            favorite_notes: [],
            favorite_collections: [],
            errors: ["username or password is incorrect"],
        });
    }
    else if (user.checkValidPassword(password)) {
        Users.createToken(res, user);
        res.status(200).json(user);
    }
    else {
        res.json({
            id: 0,
            username: null,
            email: null,
            favorite_notes: [],
            favorite_collections: [],
            errors: ["password is incorrect"],
        });
    }
};
Users.getProfile = async (req, res) => {
    const username = req.params.user;
    const data = await typeorm_1.createQueryBuilder(User_1.User, "users")
        .leftJoinAndSelect("users.collections", "collections")
        .leftJoinAndSelect("collections.added_notes", "added_notes")
        .leftJoinAndSelect("collections.notes", "notes")
        .leftJoinAndSelect("added_notes.user", "user")
        .where("collections.personal =:personal", { personal: false })
        .andWhere("users.username =:username", { username })
        .getOne();
    if (data) {
        res.json(data);
    }
    else
        res.json({ id: 0 });
};
Users.verifyUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return;
    const secret = process.env.JWT_SECRET;
    jsonwebtoken_1.default.verify(token, secret, undefined, async (err, jwtPayload) => {
        const { id } = jwtPayload;
        if (err) {
            res.status(404).send("not authorized");
        }
        if (jwtPayload) {
            const query = await typeorm_1.createQueryBuilder(User_1.User, "user")
                .leftJoinAndSelect("user.favorite_notes", "favorite_notes")
                .leftJoinAndSelect("user.collections", "collections")
                .leftJoinAndSelect("collections.user", "userId")
                .leftJoinAndSelect("collections.added_notes", "added_notes")
                .where("user.id =:id", { id })
                .getOne()
                .catch(console.error);
            if (query) {
                req.body.user = query;
                next();
            }
            else {
                res.status(200).json({
                    id: 0,
                    username: null,
                    email: null,
                    favorite_notes: [],
                    favorite_collections: [],
                    collections: [],
                });
            }
        }
    });
};
//# sourceMappingURL=users.js.map