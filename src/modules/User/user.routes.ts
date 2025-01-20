import { Router } from "express";
import { sendMsg, userPage } from "./user.controller";

const userRouter =Router()

userRouter.get('/user/:id',userPage)
userRouter.post('/sendMsg/:id',sendMsg)
export default userRouter