const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");

router.get("/signup", (req, res) =>{
    res.render("users/signup");
})

router.post("/signup", async(req, res) =>{
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    let registeredUser = await User.register(newUser, password)
    // console.log(registeredUser);
    req.flash("success", "Welcome to WanderLust!");
    res.redirect("/listings")
})

module.exports = router;