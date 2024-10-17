const express = require("express");
const cors = require("cors");
const app = express();

const globalErrorHandler = require("./controllers/errorController");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const orderRouter = require("./routes/orderRoutes");
const providerRouter = require("./routes/providerRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const problemRouter = require("./routes/problemRoutes");

app.use(cors());
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "15000kb" }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/providers", providerRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/problems", problemRouter);

app.use(globalErrorHandler);

module.exports = app;
