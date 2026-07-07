const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");
const { signUp, renderSignUpForm, renderLoginForm, checkLogin, checkLogout } = require("../controllers/users.js");

router.get("/signup", renderSignUpForm)

router.post("/signup", signUp);

router.get("/login", renderLoginForm);

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), checkLogin);

router.get("/logout", checkLogout)

module.exports = router;