import { Message } from "../../../Database";
import { AppRequest, AppResponse } from "../../utils/types";
import QRCode from 'qrcode'
export const userPage = async(req:AppRequest,res:AppResponse)=>{
    let qrCodeUrl
      let url =`${req.protocol}://${req.get('host')}/user/${req.session.userId}`
     await QRCode.toDataURL(url)
          .then(url => {
              qrCodeUrl=url
            console.log(url)
          })
          .catch(err => {
            console.error(err)
          })
          
          
        if(req.session.isLogged){
            res.render('user',{userId:req.params.id ,url,qrCodeUrl, session:req.session})
        }else{
            res.redirect('/login')
        }

}
export const sendMsg =async(req:AppRequest,res:AppResponse)=>{
    //store id
    req.body.user = req.params.id
    // add message
    await Message.insertMany(req.body)
    // redirect
    res.redirect('/user/'+req.params.id)
}