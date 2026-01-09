const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

// Route accessible by any logged-in user
router.get("/me", authenticate, (req, res) => {
  res.json({ id: req.user.id, role: req.user.role });
});

// Route accessible by admin only
router.get("/admin", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome admin!" });
});

module.exports = router;
