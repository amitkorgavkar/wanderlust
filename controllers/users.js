const User = require("../Models/user.js");
const passport = require("passport");

module.exports.renderSignUpForm = (req, res) =>{
    res.render("users/signup");
};

module.exports.signUp = async(req, res) =>{
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
};

module.exports.renderLoginForm = (req, res) =>{
    res.render("users/login");
};

module.exports.checkLogin = async(req, res) =>{
    // console.log(req.user);
    req.flash("success", "Welcome to WanderLust!");
    let redirectUrl = res.locals.saveRedirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.checkLogout = (req, res, next) =>{
    req.logout((err) =>{
        if(err){
            return next(err)
        }
        req.flash("success", "You logged out successfully");
        res.redirect("/listings")
    })
}