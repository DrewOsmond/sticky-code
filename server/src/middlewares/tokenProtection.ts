import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers.auth;
  const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
  const jwtAuth = jwt.verify(token, secret);
  if (jwtAuth) {
    res.locals.jwtAuth = jwtAuth;
    next();
  } else {
    res.status(401).send();
  }
};
