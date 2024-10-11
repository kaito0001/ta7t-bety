const multer = require("multer");
const sharp = require("sharp");
const Provider = require("../models/providerModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProviderId = upload.array("id", 2);
exports.uploadCriminalRecord = upload.single("criminalRecord");

const processImage = async (file) => {
  return sharp(file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 });
};

exports.resizeProviderImages = catchAsync(async (req, res, next) => {
  if (!req.file && (!req.files || req.files.length === 0)) {
    return next();
  }

  if (req.file) {
    const criminalRecordFilename = `provider-${
      req.params.id
    }-${Date.now()}-criminalRecord.jpeg`;
    await processImage(req.file);
    req.body.criminalRecord = criminalRecordFilename;
  }

  if (req.files) {
    req.body.id = await Promise.all(
      req.files.map(async (file, i) => {
        const idFilename = `provider-${req.params.id}-${Date.now()}-${
          i + 1
        }.jpeg`;
        await processImage(file);
        return idFilename;
      })
    );
  }

  next();
});

exports.getAllProviders = factory.getAll(Provider , {path:"reviews"});
exports.getProviderById = factory.getOne(Provider, { path: "reviews" });
exports.updateProvider = factory.updateOne(Provider);
exports.deleteProvider = factory.deleteOne(Provider);

exports.createProvider = catchAsync(async (req, res) => {
  const loggedInUser = req.user;

  try {
    if (loggedInUser.role !== "provider") {
      return res
        .status(400)
        .json({ message: "Only providers can create provider records" });
    }

    req.body.providerID = loggedInUser.id;

    const provider = await Provider.create(req.body);
    res.status(201).json({
      message: "success",
      provider,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Provider already exists for this user",
      });
    }
    res.status(500).json({ message: error.message });
  }
});

exports.setSubscriptionPresentage = catchAsync(async (req, res) => {
  const { subscriptionPercentage } = req.body;
  if (subscriptionPercentage < 0 || subscriptionPercentage > 100) {
    return res.status(400).json({ message: "Invalid subscription percentage" });
  }

  const provider = await Provider.findByIdAndUpdate(
    req.params.id,
    { subscriptionPercentage },
    { new: true }
  );

  if (!provider) {
    return res.status(404).json({ message: "Provider not found" });
  }

  res.status(200).json({
    status: "success",
    provider,
  });
});
