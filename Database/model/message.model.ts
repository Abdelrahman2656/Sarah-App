import { model, Schema } from "mongoose"

//schema
interface message {
    message:string,
    user:string
}
//schema 
const messageSchema = new Schema<message>({
    message:{
        type:String,
        required:true
    },
    user:String
})
//model
export const Message = model('Message', messageSchema)