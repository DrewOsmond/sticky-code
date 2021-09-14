import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Languages } from "src/db/controllers/languages/language";

const router = Router();

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    await Languages.getAll(req, res);
  })
);

export default router;
