import { Router } from "express";
import userRouter from "./users";
import searchRouter from "./search";
import notesRouter from "./notes";
import commentsRouter from "./comments";
import collectionsRouter from "./collections";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/search", searchRouter);
routes.use("/notes", notesRouter);
routes.use("/comments", commentsRouter);
routes.use("/collections", collectionsRouter);

export default routes;
