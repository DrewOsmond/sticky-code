import { Router } from "express";
import userRouter from "./users";
import searchRouter from "./search";
import categoryRouter from "./categories";
import NotesRouter from "./notes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/search", searchRouter);
routes.use("/categories", categoryRouter);
routes.use("/notes", NotesRouter);

export default routes;
