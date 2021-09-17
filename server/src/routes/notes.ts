import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Notes } from "../db/controllers/notes";

const router = Router();

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    await Notes.addNote(req, res);
  })
);

router.put(
  "/update",
  asyncHandler(async (req, res) => {
    await Notes.updateNote(req, res);
  })
);

router.delete(
  "/delete",
  asyncHandler(async (req, res) => {
    await Notes.deleteNote(req, res);
  })
);

export default router;
