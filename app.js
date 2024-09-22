const express = require("express");
const app = express();

const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/users", userRouter);

app.use(globalErrorHandler);

module.exports = app;
