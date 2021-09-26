import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Notes } from "../db/controllers/notes";
import { Users } from "../db/controllers/users";

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
  Users.verifyUser,
  asyncHandler(async (req, res) => {
    await Notes.addNote(req, res);
  })
);

router.put(
  "/update",
  Users.verifyUser,
  asyncHandler(async (req, res) => {
    await Notes.updateNote(req, res);
  })
);

router.delete(
  "/delete",
  Users.verifyUser,
  asyncHandler(async (req, res) => {
    await Notes.deleteNote(req, res);
  })
);

export default router;
