const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "An order must belong to a user"],
  },
  providerID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "An order must belong to a provider"],
  },
  description: {
    type: String,
    required: [true, "An order must have a description"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "canceled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
    required: [true, "An order must have a price"],
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
