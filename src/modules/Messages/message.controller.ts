import { Message } from "../../../Database"; // Adjust the import path as needed
import { AppRequest, AppResponse } from "../../utils/types"; // Ensure this type is defined in your project
import QRCode from 'qrcode';

export const messagePage = async (req: AppRequest, res: AppResponse) => {
  
  const userId = req.session.userId || req.user?._id; 

    // Generate the URL for the QR code
    const url = `${req.protocol}://${req.get('host')}/user/${userId}`;

    // Generate the QR code
    let qrCodeUrl;
    try {
      qrCodeUrl = await QRCode.toDataURL(url);
      console.log('QR Code URL:', qrCodeUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
      qrCodeUrl = null; // Set to null if QR code generation fails
    }

    // Fetch messages for the logged-in user
    const messages = await Message.find({  user: req.session.userId || req.user?._id, });

    // Render the message page
    res.render('message', {
      session: req.session,
      user:req.user,
      url,
      qrCodeUrl,
      messages,
      authentication: req.isAuthenticated()
    });
   
};