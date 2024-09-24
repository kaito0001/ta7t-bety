const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo("user", "admin"));

router.route("/user-orders/:id").get(orderController.getUserOrders);
router.route("/my-orders").get(orderController.getMyOrders);

router
  .route("/:id")
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

router.route("/").post(orderController.createOrder);

module.exports = router;
