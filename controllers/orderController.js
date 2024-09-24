const Order = require("../models/orderModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ userID: req.params.id });

  if (!orders) {
    return next(new AppError("No orders found for this provider", 404));
  }

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ userID: req.user.id });

  if (!orders) {
    return next(new AppError("No orders found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  req.body.userID = req.user.id;
  const order = await Order.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.getOrder = factory.getOne(Order);
