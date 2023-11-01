const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.listen(3000);
app.use(cookieParser());

const userRouter = require("./routers/userRouters");
// const authRouter = require("./routers/authRouters");
const planRouter = require("./routers/planRouters");
const reviewRouters = require("./routers/reviewRouters");
app.use("/review", reviewRouters);
app.use("/user", userRouter);
app.use("/plans", planRouter);

