// Middleware to check if user is logged in

module.exports = (req, res, next) => {
        if (req.isAuthenticated()) {
                next();
        } else {
                res.redirect('/login');
        }
}