const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all routes
router.use(authController.protect);

router.get("/me", userController.getMe, userController.getUser);
router.patch("/update-me", userController.updateMe);
router.delete("/delete-me", userController.deleteMe);

// Restrict all routes after this middleware to admin only
router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
