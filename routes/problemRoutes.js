const express = require("express");
const problemController = require("../controllers/problemControllers");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("moderator", "admin"),
    problemController.getAllProblems
  )
  .post(
    authController.protect,
    authController.restrictTo("user", "provider"),
    problemController.setUserId,
    problemController.createProblem
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("moderator" , "admin"),
    problemController.getProblem
  )
  .patch(
    authController.protect,
    authController.restrictTo("user", "provider"),
    problemController.updateProblem
  )
  .delete(
    authController.protect,
    authController.restrictTo("user", "provider"),
    problemController.deleteProblem
  );

module.exports = router;
