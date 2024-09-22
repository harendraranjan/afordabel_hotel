const express = require("express");
const User = require("../models/user.js");


module.exports.signup=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        let registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            };
            req.flash("success", "Welcome to our page");
            res.redirect("/listings");
        })
        
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.login=async (req, res) => {
    req.flash("success","You are logged out successfully");
    let redirectUrl=res.locals.redirectUrl||"\listings"
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
    })
    req.flash("success","You are logged out successfully");
    res.redirect("/listings");
}

