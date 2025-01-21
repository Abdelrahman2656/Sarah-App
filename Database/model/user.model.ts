import { model, Schema, Document, Model } from "mongoose";


// Define the User interface
interface IUser {
  name: string;
  email: string;
  password: string;
  googleId: string;
  _id: string;
}

// Extend express-session to include custom session data
declare module 'express-session' {
  interface SessionData {
    isLogged: boolean;
    userId: string;
    userName: string;
  }
}

// Define the User schema
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true, // Ensure emails are unique
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    required: true,
    unique: true, // Ensure Google IDs are unique
  },
});


userSchema.statics.findOrCreate = async function (conditions: any, doc: any) {
  let user = await this.findOne(conditions); // Try to find the user
  if (!user) {
    user = await this.create(doc); // If not found, create a new user
  }
  return user;
};


interface UserModel extends Model<IUser> {
  findOrCreate: (conditions: any, doc: any) => Promise<IUser>;
}


export const User = model<IUser, UserModel>('User', userSchema);