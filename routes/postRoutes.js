const express = require("express");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);
router
  .route("/my-posts")
  .get(authController.restrictTo("provider"), postController.getMyposts);

router.route("/provider-posts/:id").get(postController.getProviderPosts);
router.route("/:id").get(postController.getPost);

router.use(authController.restrictTo("provider", "admin"));

router
  .route("/:id")
  .patch(postController.updatePost)
  .delete(postController.deletePost);

router.route("/").post(postController.createPost);

module.exports = router;
