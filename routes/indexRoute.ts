import express from "express";
import { ensureAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

export default router;
