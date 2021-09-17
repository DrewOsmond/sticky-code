import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Notes } from "../db/controllers/notes";

const router = Router();

router.get(
  "/get/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) res.status(404).send("not found");
    await Notes.getNote(id, res);
  })
);

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
