const express = require("express");
const { signup, login, getCurrentUser, logout} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// signup
router.post("/signup", signup);
// login
router.post("/login", login);
// me
router.get("/me", authMiddleware, getCurrentUser);
// logout
router.post("/logout", logout);
module.exports = router;
