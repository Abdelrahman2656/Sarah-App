import mongoSession from 'connect-mongodb-session'
import cors from 'cors'
import dotenv from 'dotenv'
import { Application } from 'express'
import session from 'express-session'
import path from 'path'
import { dbconnection } from '../Database/dbconnection'
import { homeRouter, loginRouter, logoutRouter, messageRouter, registerRouter, userRouter } from './modules'
import passport from 'passport'
import router from './utils/auth'

let MongoDBStore= mongoSession(session)
export const bootstrap= (app:Application , express:typeof import('express'))=>{
    
dotenv.config({path:path.resolve('./config/.env')})
//database connection
dbconnection()
app.use(express.urlencoded({extended:true}))

const store =new MongoDBStore({
    uri: process.env.BASE_DB||'',
   
    collection:"MyCollection"
  })
app.use(session({
  secret : process.env.SECRET_SESSION || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(cors({
  origin: '*', 
}));
app.use(passport.initialize());
app.use(passport.session());

// Use the auth router
app.use(router);
app.use(homeRouter)
app.use(loginRouter)
app.use(messageRouter)
app.use(registerRouter)
app.use(userRouter)
app.use(logoutRouter)
}