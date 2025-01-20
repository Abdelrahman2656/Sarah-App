import { Router } from "express";
import { logout } from "./logout.controller";

const logoutRouter =Router()

logoutRouter.get('/logout',logout)
export default logoutRouter