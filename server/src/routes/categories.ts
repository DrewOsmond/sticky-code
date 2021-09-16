import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Categories } from "../db/controllers/category";

const router = Router();

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    Categories.getAll(req, res);
  })
);

export default router;
