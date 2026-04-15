const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  makeMeAdmin
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post("/make-admin", makeMeAdmin);
module.exports = router;

