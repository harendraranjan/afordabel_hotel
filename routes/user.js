const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js");



router.get("/signup", (req, res) => {
    res.render("user/signup");
});

router.post("/signup", wrapAsync( userController.signup));

router.get("/login", 
     (req, res) => {
    res.render("user/login");
}
);

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login);


router.get("/logout",userController.logout);
module.exports = router;
