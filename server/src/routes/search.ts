import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Searches } from "../db/controllers/search";

const router = Router();

router.get(
  "/:language/:searchterm",
  asyncHandler(async (req, res) => {
    const language = req.params.language;
    const searchterm = req.params.searchterm;
    Searches.searchNotes(res, [language, searchterm]);
  })
);

router.get(
  "/recent",
  asyncHandler(async (_req, res) => {
    await Searches.getRecent(res);
  })
);

export default router;
