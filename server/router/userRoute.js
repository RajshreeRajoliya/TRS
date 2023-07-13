import express from "express";

import { signupUser , loginUser} from "../controller/userController.js"

const userRouter = express.Router();



userRouter.post("/register",signupUser);

userRouter.post("/login",loginUser);

export default userRouter;