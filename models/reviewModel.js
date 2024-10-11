const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty!"],
    },
    rating: {
      type: Number,
      min: [1, "minimum rating value is 1"],
      max: [5, "maximum rating value is 5"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      reguired: [true, "Review must belong to a user."],
    },
    provider: {
      type: mongoose.Schema.ObjectId,
      ref: "Provider",
      reguired: [true, "Review must belong to a provider"], // This ref will link to User model by id.
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ user: 1, provider: 1 }, { unique: true }); // to prevent duplicate review form the same user on the same tour

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo email",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
