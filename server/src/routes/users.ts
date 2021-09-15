import { Router } from "express";
import asyncHandler from "express-async-handler";
import { UserAuth } from "../db/controllers/userAuth";

const router = Router();

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    await UserAuth.signup(req, res);
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    await UserAuth.login(req, res);
  })
);

router.get(
  "/restore",
  asyncHandler(async (req, res, next) => {
    await UserAuth.restoreUser(req, res, next);
  })
);

router.delete("/logout", (_req, res) => {
  res.clearCookie("token");
  res.status(204).send("success");
});

export default router;
