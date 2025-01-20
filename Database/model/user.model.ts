import { model, Schema } from "mongoose"
import { Session, SessionData } from 'express-session';
//schema
interface user{
    name:string,
    email:string,
    password:String,
    

}
declare module 'express-session' {
    interface SessionData {
        isLogged: boolean;
        userId: string;
        userName:string
    }
}

const userSchema=new Schema<user>({
    name:{
        type:String,
       
    },
    email:{
        type:String,
        
    },
    password:{
        type:String,
        
    },
  
})
//model 
export const User = model('User',userSchema)