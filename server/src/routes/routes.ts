import { Router } from "express";
import userRouter from "./users";
import searchRouter from "./search";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/search", searchRouter);

export default routes;
