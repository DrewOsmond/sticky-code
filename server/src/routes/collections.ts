import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Collections } from "../db/controllers/collections";

const router = Router();

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    await Collections.addCollection(req, res);
  })
);

router.delete(
  "/remove",
  asyncHandler(async (req, res) => {
    await Collections.deleteCollection(req, res);
  })
);

router.put(
  "/edit",
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
  asyncHandler(async (req, res) => {
    await Collections.addNoteToCollection(req, res);
  })
);

router.delete(
  "/remove-note",
  asyncHandler(async (req, res) => {
    await Collections.deleteNoteFromCollection(req, res);
  })
);

export default router;
