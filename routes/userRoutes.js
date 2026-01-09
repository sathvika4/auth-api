const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.get("/profile", authenticate, (req, res) => {
  res.json({ message: "This is your profile", user: req.user });
});

router.get("/admin", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/dashboard", authenticate, authorize(["user", "admin"]), (req, res) => {
  res.json({ message: "Dashboard for users and admins", user: req.user });
});

module.exports = router;
