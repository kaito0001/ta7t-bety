const catchAsync = require("../utils/catchAsync");
const Review = require("./../models/reviewModel");
const factory=require("./handlerFactory")


exports.getAllReviews = factory.getAll(Review);

exports.setProviderUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.provider) req.body.provider = req.params.providerID;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};


exports.getProviderReviews=catchAsync(async (req , res , next)=>{
  const reviews = await Review.find({ provider: req.params.providerID });

   if (!reviews) {
     return next(new AppError("No reviews found for this provider", 404));
   }

   res.status(200).json({
     status: "success",
     results: reviews.length,
     data: {
       reviews,
     },
   });
})



exports.getReview = factory.getOne(Review ,{ path : "reviews" , select:"review"});
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);