import { Router } from "express";
import { handleRegister, registerPage } from "./register.controller";

const registerRouter =Router()
registerRouter.get('/register',registerPage)
//signup
registerRouter.post('/handleRegister',handleRegister)
export default registerRouter