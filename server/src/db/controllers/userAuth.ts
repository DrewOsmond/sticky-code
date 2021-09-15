import { User } from "../entity/User";
import { getRepository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { getValidationErrors } from "./errors";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const inProduction = process.env.NODE_ENV === "production";
export class UserAuth {
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

    const potentialErrors: ValidationError[] = await validate(user);

    if (potentialErrors.length > 0) {
      const errors = getValidationErrors(potentialErrors);
      res.status(404).send(errors);
      return;
    }

    user.stringPasswordToHashed();

    await userTable.save(user).catch((_e: any) => {
      throw new Error("Username or email already in use");
    });
    // res.status(409).send('username or email already in use');
    // return;

    const { id } = user;
    const userData = { username, email, id };
    UserAuth.createToken(res, user);
    res.status(201).json({ user: userData });
  };

  static login = async (req: Request, res: Response): Promise<void> => {
    const userTable = getRepository(User);
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send("username or password is missing");
      return;
    }

    const user = await userTable.findOne({ where: { username } });

    if (!user) {
      res.status(400).send("username or password does not match");
    } else if (user.checkValidPassword(password)) {
      UserAuth.createToken(res, user);
      const { username, email, id } = user;
      const userData = { username, email, id };
      res.status(200).json({ user: userData });
    } else {
      res.status(400).send("password does not match");
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

  static restoreUser = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const userTable = getRepository(User);
    const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
    const { token } = req.cookies;

    jwt.verify(token, secret, undefined, async (err, jwtPayload: any) => {
      if (err) res.status(200).json({ user: null });

      if (jwtPayload) {
        const { id } = jwtPayload;
        const user = await userTable.findOne({
          where: { id },
          select: ["id", "username", "email"],
        });
        if (user) res.status(200).json(user);
        else res.status(200).send({ user: null });
      }
    });
  };
}
