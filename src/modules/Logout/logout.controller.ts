import { AppRequest, AppResponse } from "../../utils/types";

export const logout = (req: AppRequest, res: AppResponse) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // Log out the user using Passport.js
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).send('Internal Server Error');
      }

      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).send('Internal Server Error');
        }

        // Redirect to the login page
        res.redirect('/login');
      });
    });
  } else {
    // If the user is not authenticated, just redirect to the login page
    res.redirect('/login');
  }
};