import { User } from "../../../Database";
import { AppRequest, AppResponse } from "../../utils/types";

export const loginPage = (req:AppRequest,res:AppResponse)=>{
    res.render('login',{error:req.query.error,session:null})
}
export const handleLogin =async (req:AppRequest,res:AppResponse)=>{
    let {email,password}=req.body 
    //compare
    let userExist=await User.findOne({email}) 
    if(!userExist || !userExist.password == password){
        return res.redirect('/login?error=Incorrect Email Or Password')
    }
    req.session.isLogged = true;
    req.session.userId = userExist._id.toString();
    req.session.userName=userExist.name
   res.redirect('/message')
}