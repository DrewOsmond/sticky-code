import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Comments } from "../db/controllers/comments";

const router = Router();

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    await Comments.addComments(req, res);
  })
);

router.delete(
  "/delete",
  asyncHandler(async (req, res) => {
    await Comments.deleteComment(req, res);
  })
);

router.put(
  "/update",
  asyncHandler(async (req, res) => {
    await Comments.updateComment(req, res);
  })
);

export default router;
