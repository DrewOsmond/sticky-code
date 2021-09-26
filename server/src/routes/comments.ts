import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Users } from "../db/controllers/users";
import { Comments } from "../db/controllers/comments";

const router = Router();

router.post(
  "/add",
  Users.verifyUser,
  asyncHandler(async (req, res) => {
    await Comments.addComments(req, res);
  })
);

router.delete(
  "/delete",
  Users.verifyUser,
  asyncHandler(async (req, res) => {
    await Comments.deleteComment(req, res);
  })
);

router.put(
  "/update",
  Users.verifyUser,
  asyncHandler(async (req, res) => {
    await Comments.updateComment(req, res);
  })
);

export default router;
