import { Router } from "express";
import userRouter from "./users";
import languageRouter from "./languages";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/language", languageRouter);

export default routes;
