const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  providerID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A post must belong to a provider"],
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "A post must have a title"],
    trim: true,
    maxlength: [20, "A post title must have less or equal then 20 characters"],
  },
  content: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
  },
  isMainService: {
    type: Boolean,
    default: false,
  },
});

// postSchema.pre(/^create/, function (next) {
//   this.providerID = req.user.id;
//   console.log(req.user.id);

//   next();
// });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
