const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");
const { signUp, renderSignUpForm, renderLoginForm, checkLogin, checkLogout } = require("../controllers/users.js");

router.route("/signup").get(renderSignUpForm).post(signUp);

router.route("/login").get(renderLoginForm).post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), checkLogin);

router.get("/logout", checkLogout);

module.exports = router;