const { Router } = require("express");
const router = new Router();
const passport = require('passport')
const auth = require('../../middlewares/auth');
const multer  = require('multer')
const userModel = require('../../models/user.model');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/public/img/users");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage })

const { getLogin, getSignUp, getLogout, getErrorLogin, getErrorSignUp, getProfile } = require('../../controllers/login.controller')

router.get('/login', getLogin);

router.get('/logout', getLogout)

router.get('/signup', getSignUp);

router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/error',
    failureFlash: true
}))

router.get("/error", getErrorLogin)

router.post("/signup", passport.authenticate('register', {
    successRedirect: '/profile',
    failureRedirect: '/errorR',
    failureFlash: true
}))

router.get("/erroR", getErrorSignUp)

router.get('/profile', auth, getProfile)

router.post('/profile', auth, upload.single('avatar'), (req, res) => {
    const userId = req.user._id;
    userModel.uploadImg(userId, req.file.filename)
    res.redirect('/')
})

module.exports = router;