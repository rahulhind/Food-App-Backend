const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.listen(3000);
app.use(cookieParser());

const userRouter = require("./routers/userRouters");
const authRouter=require("./routers/authRouters")
app.use("/auth", authRouter);
app.use("/user", userRouter);