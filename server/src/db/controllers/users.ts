import { User } from "../entity/User";
import { createQueryBuilder, getRepository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { getValidationErrors } from "./errors";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const inProduction = process.env.NODE_ENV === "production";

export class Users {
  static signup = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    const strongPassword: RegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (!(username && email && password)) {
      res.status(400).send("invalid information");
      return;
    } else if (!password.match(strongPassword)) {
      res.status(400).send("password is not secure");
      return;
    }

    const userTable = getRepository(User);
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.favorite_notes = [];
    user.collections = [];
    const potentialErrors: ValidationError[] = await validate(user);

    if (potentialErrors.length > 0) {
      const errors = getValidationErrors(potentialErrors);
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

    const data = await userTable.save(user).catch((_e: any) => {
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

  static login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send("username or password is missing");
      return;
    }

    const user = await createQueryBuilder(User, "user")
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
      // res.status(400).send("username or password is incorrect");
    } else if (user.checkValidPassword(password)) {
      Users.createToken(res, user);
      res.status(200).json(user);
    } else {
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

  static createToken(res: Response, user: User): string {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: Number(<any>process.env.JWT_EXPIRES_IN * 1000),
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: inProduction && "lax",
      secure: inProduction,
      maxAge: Number(<any>process.env.JWT_EXPIRES_IN * 1000),
    });
    return token;
  }

  static getProfile = async (req: Request, res: Response) => {
    const username = req.params.user;
    const data = await createQueryBuilder(User, "users")
      .leftJoinAndSelect("users.collections", "collections")
      .leftJoinAndSelect("collections.added_notes", "added_notes")
      .leftJoinAndSelect("collections.notes", "notes")
      .leftJoinAndSelect("added_notes.user", "user")
      .where("collections.personal =:personal", { personal: false })
      .andWhere("users.username =:username", { username })
      .getOne();

    if (data) {
      res.json(data);
    } else res.json({ id: 0 });
  };

  static verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { token } = req.cookies;
    const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
    jwt.verify(token, secret, undefined, async (err, jwtPayload: any) => {
      const { id } = jwtPayload;
      if (err) {
        res.status(404).send("not authorized");
      }
      if (jwtPayload) {
        const query = await createQueryBuilder(User, "user")
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
        } else {
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
}
