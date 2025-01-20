import { Router } from "express";
import { messagePage } from "./message.controller";

const messageRouter =Router()
messageRouter.get('/message',messagePage)

export default messageRouter