import { Message } from "../../../Database";
import { AppRequest, AppResponse } from "../../utils/types";
import QRCode from 'qrcode'
export const userPage = async(req:AppRequest,res:AppResponse)=>{
  const userId = req.session.userId || req.user?._id; 
    let qrCodeUrl
      let url =`${req.protocol}://${req.get('host')}/user/${userId}`
     await QRCode.toDataURL(url)
          .then(url => {
              qrCodeUrl=url
            console.log(url)
          })
          .catch(err => {
            console.error(err)
            qrCodeUrl = null; // Set to null if QR code generation fails
          })
          
          
        if(req.isAuthenticated()){
            res.render('user',{userId:req.params.id ,url,qrCodeUrl,     error:req.query.error,session:req.session,user:req.user,authentication:req.isAuthenticated() })
    
            
        }else{
            res.redirect('/login')
        }

}
export const sendMsg =async(req:AppRequest,res:AppResponse)=>{
  const { message } = req.body; 

  // Validate the message
  if (!message || message.trim() === '') {
    return res.redirect(`/user/${req.params.id}?error=Message cannot be empty`);
  }

  
  req.body.user = req.params.id;

  
  await Message.insertMany(req.body);

  // Redirect to the user's profile page
  res.redirect(`/user/${req.params.id}`);
}