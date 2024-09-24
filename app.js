const express = require("express");
const app = express();

const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const orderRouter = require("./routes/orderRoutes");

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/orders", orderRouter);

app.use(globalErrorHandler);

module.exports = app;
