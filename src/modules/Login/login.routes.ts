import { Router } from "express";
import { handleLogin, loginPage } from "./login.controller";

const loginRouter =Router()

loginRouter.get('/login',loginPage)
loginRouter.post('/handleLogin',handleLogin)

export default loginRouter