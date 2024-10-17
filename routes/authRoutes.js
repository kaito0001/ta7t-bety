const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// not logged in users
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);

// logged in users
router.patch(
  "/update-password",
  authController.protect,
  authController.updatePassword
);

module.exports = router;
