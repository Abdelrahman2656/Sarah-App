"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = (req, res) => {
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
    }
    else {
        // If the user is not authenticated, just redirect to the login page
        res.redirect('/login');
    }
};
exports.logout = logout;
