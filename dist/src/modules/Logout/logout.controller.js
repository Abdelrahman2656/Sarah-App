"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = (req, res) => {
    //destroy
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
};
exports.logout = logout;
