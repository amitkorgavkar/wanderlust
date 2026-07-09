const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../Models/listings.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, renderNewForm, showPage, createListing, editListing, updateListing, deleteListing } = require("../controllers/listings.js");

router.route("/").get(wrapAsync(index))
.post(isLoggedIn, validateListing, wrapAsync(createListing));

//New Route
router.get("/new", isLoggedIn, renderNewForm);

router.route("/:id").get(wrapAsync(showPage)).put(validateListing, isOwner, isLoggedIn, wrapAsync(updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing))

module.exports = router;