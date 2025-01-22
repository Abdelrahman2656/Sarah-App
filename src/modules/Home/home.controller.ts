import { AppRequest, AppResponse } from "../../utils/types"


export const homePage =  (req:AppRequest, res:AppResponse) =>{
    
    res.render('home',{session:req.session ,  authentication:null})
}