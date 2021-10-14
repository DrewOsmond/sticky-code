import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Users } from "../db/controllers/users";
import { Collections } from "../db/controllers/Collections";

const router = Router();

router.post(
  "/add",
  Users.verifyUser,
  asyncHandler(async (req, res) => {
    await Collections.addCollection(req, res);
  })
);

router.delete(
  "/remove",
  Users.verifyUser,
  asyncHandler(async (req, res) => {
    await Collections.deleteCollection(req, res);
  })
);

router.put(
  "/edit",
  Users.verifyUser,
  asyncHandler(async (req, res) => {
    await Collections.editCollection(req, res);
  })
);

router.get(
  "/:user/:id",
  asyncHandler(async (req, res) => {
    await Collections.getOne(req, res);
  })
);

router.post(
  "/add-note",
  Users.verifyUser,
  asyncHandler(async (req, res) => {
    await Collections.addNoteToCollection(req, res);
  })
);

router.delete(
  "/remove-note",
  Users.verifyUser,
  asyncHandler(async (req, res) => {
    await Collections.deleteNoteFromCollection(req, res);
  })
);

export default router;
