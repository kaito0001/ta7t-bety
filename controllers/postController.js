const Post = require("../models/postModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getProviderPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ providerID: req.params.id });

  if (!posts) {
    return next(new AppError("No posts found for this provider", 404));
  }

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.getMyposts = catchAsync(async (req, res, next) => {
  console.log(req.user.id);

  const posts = await Post.find({ providerID: req.user.id });

  if (!posts) {
    return next(new AppError("No posts found for this provider", 404));
  }

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  req.body.providerID = req.user.id;
  const post = await Post.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
exports.getPost = factory.getOne(Post);
