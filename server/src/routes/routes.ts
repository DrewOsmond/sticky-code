import { Router } from "express";
import userRouter from "./users";
import searchRouter from "./search";
import categoryRouter from "./categories";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/search", searchRouter);
routes.use("/categories", categoryRouter);

export default routes;
