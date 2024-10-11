const express = require("express");
const app = express();

const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const orderRouter = require("./routes/orderRoutes");
const providerRouter = require("./routes/providerRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const problemRouter = require("./routes/problemRoutes");

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/providers", providerRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/problems", problemRouter);

app.use(globalErrorHandler);

module.exports = app;
