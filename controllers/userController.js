const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const uploadFile = require("../utils/uploadBase64");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

// Add user id to the request object to handle it with factory.getOne
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// Update current user data
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please user /updatePassword.",
        400
      )
    );
  }

  if (req.body.photo) {
    req.body.photo = await uploadFile(req.body.photo, false);
  }

  // 2) Filter unwanted fields
  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "phoneNumber",
    "photo"
  );

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// Delete current user account
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// =======This part is for admin only=======
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User); //! Do NOT update passwords with this!!!
