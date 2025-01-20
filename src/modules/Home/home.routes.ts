import { Router } from "express";
import { homePage } from "./home.controller";


const homeRouter =Router()
homeRouter.get('/', homePage )

export default homeRouter