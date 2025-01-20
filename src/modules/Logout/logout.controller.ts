import { AppRequest, AppResponse } from "../../utils/types";

export const logout = (req:AppRequest,res:AppResponse)=>{
    //destroy
    req.session.destroy(function(err) {
        res.redirect('/login')
      })
}