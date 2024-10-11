const Problem = require("../models/problemModel");
const factory = require("./handlerFactory");


exports.getAllProblems = factory.getAll(Problem);


exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getProblem = factory.getOne(Problem);
exports.createProblem = factory.createOne(Problem);
exports.updateProblem = factory.updateOne(Problem);
exports.deleteProblem = factory.deleteOne(Problem);
