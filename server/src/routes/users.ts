import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Users } from "../db/controllers/users";
import { Notes } from "../db/controllers/Notes";

const router = Router();

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    await Users.signup(req, res);
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    await Users.login(req, res);
  })
);

router.get(
  "/restore",
  asyncHandler(async (req, res) => {
    await Users.restoreUser(req, res);
  })
);

router.delete("/logout", (_req, res) => {
  res.clearCookie("token");
  res.status(204).send("success");
});

router.post(
  "/add-favorite-note",
  asyncHandler(async (req, res) => {
    await Notes.addFavoriteNotes(req, res);
  })
);

router.delete(
  "/remove-favorite-note",
  asyncHandler(async (req, res) => {
    await Notes.removeFavoriteNotes(req, res);
  })
);

router.get(
  "/profile/:user",
  asyncHandler(async (req, res) => {
    await Users.getProfile(req, res);
  })
);

export default router;
