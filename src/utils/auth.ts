import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport from "passport";
import { AppRequest, AppResponse } from "./types"; // Ensure this type is defined in your project
import { User } from "../../Database";
import { NextFunction, Router } from "express";
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve('./config/.env') });

// Middleware to check if the user is logged in
export const isLoggedIn = (req: AppRequest, res: AppResponse, next: NextFunction) => {
  if (req.isAuthenticated()) {
    
    next()
    
    
  } else {
    // User is not logged in, redirect to the login page
    res.redirect('/login');
  }
};

// Define the Google OAuth2 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.CALLBACK_URL as string,
      passReqToCallback: true,
    },
    async (
      request: AppRequest,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (error: any, user?: any) => void
    ) => {
      try {
        console.log('Google Profile:', profile);

        // Find or create a user in the database
        const user = await User.findOrCreate(
          { googleId: profile.id }, // Conditions to find the user
          {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            
          } // Data to create the user if not found
        );

        // Set session data
        request.session.isLogged = true;
        request.session.userId = user._id.toString();
        request.session.userName = user.name;
        
        console.log('Session data set:', request.session);

        // Pass the user to Passport
        return done(null, user);
      } catch (err) {
        console.error('Error in Google strategy:', err);
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user: any, done) => {
  done(null, user._id  )
  // Serialize the user ID
});

passport.deserializeUser((id: string, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user); // Deserialize the user object
    })
    .catch((err) => {
      done(err, null); // Handle errors
    });
});

// Define the router for Google authentication
const router = Router();

// Route to initiate Google authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { successRedirect: '/message', failureRedirect: "/login" })
  
 
  
);



export default router;
