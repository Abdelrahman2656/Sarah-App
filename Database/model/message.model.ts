import { model, Schema } from "mongoose"

//schema
interface message {
    message:string,
    user:string
}
//schema 
const messageSchema = new Schema<message>({
    message:String,
    user:String
})
//model
export const Message = model('Message', messageSchema)