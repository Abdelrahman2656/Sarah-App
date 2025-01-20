import { Message } from "../../../Database";
import { AppRequest, AppResponse } from "../../utils/types";
import QRCode from 'qrcode'
//second step and third 
export const messagePage = async(req:AppRequest,res:AppResponse)=>{
   let url =`${req.protocol}://${req.get('host')}/user/${req.session.userId}`
let qrCodeUrl
    // With promises
    await QRCode.toDataURL(url)
      .then(url => {
          qrCodeUrl=url
        console.log(url)
      })
      .catch(err => {
        console.error(err)
      })
      let messages =await Message.find({user:req.session.userId})
      
    if(req.session.isLogged){
        res.render('message',{session:req.session ,url ,qrCodeUrl,messages})
    }else{
        res.redirect('/login')
    }
    
}