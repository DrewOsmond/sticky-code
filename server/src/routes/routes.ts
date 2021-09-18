import { Router } from "express";
import userRouter from "./users";
import searchRouter from "./search";
import categoryRouter from "./categories";
import notesRouter from "./notes";
import commentsRouter from "./comments";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/search", searchRouter);
routes.use("/categories", categoryRouter);
routes.use("/notes", notesRouter);
routes.use("/comments", commentsRouter);

export default routes;
