import { Router } from "express";
import { messagePage } from "./message.controller";
import { isLoggedIn } from "../../utils/auth";




const messageRouter =Router()
messageRouter.get('/message',isLoggedIn,messagePage)

export default messageRouter