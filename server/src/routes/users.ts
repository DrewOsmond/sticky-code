import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Users } from "../db/controllers/users";

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
  "/add-favorite",
  asyncHandler(async (req, res) => {
    await Users.addFavorites(req, res);
  })
);

router.delete(
  "/remove-favorite",
  asyncHandler(async (req, res) => {
    await Users.removeFavorites(req, res);
  })
);

export default router;
