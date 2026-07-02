const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) =>{
    res.render("users/signup");
})

router.post("/signup", async(req, res) =>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) =>{
            if(err){
                return next(err)
            }
            req.flash("success", "Welcome to WanderLust! You are logged in!");
            res.redirect("/listings")
        })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});

router.get("/login", (req, res) =>{
    res.render("users/login");
});

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), async(req, res) =>{
    // console.log(req.user);
    req.flash("success", "Welcome to WanderLust!");
    let redirectUrl = res.locals.saveRedirectUrl || "/listings"
    res.redirect(redirectUrl);
});


router.get("/logout", (req, res, next) =>{
    req.logout((err) =>{
        if(err){
            return next(err)
        }
        req.flash("success", "You logged out successfully");
        res.redirect("/listings")
    })
})

module.exports = router;