const express = require("express");


// const { Logcheck } = require("../middleware/Logcheck.js");
const { signupUser , loginUser , getUserbyID } = require("../controller/userController.js")

const userRouter = express.Router();

//Registering new user by logging the date of registeration

userRouter.post("/register",signupUser);

userRouter.post("/login",loginUser);

userRouter.get("/:id", getUserbyID);

module.exports = { userRouter };