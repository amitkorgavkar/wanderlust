const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../Models/listings.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, renderNewForm, showPage, createListing, editListing, updateListing, deleteListing } = require("../controllers/listings.js");

//Index Route
router.get("/", wrapAsync(index))

//New Route
router.get("/new", isLoggedIn, renderNewForm)

//Show Route
router.get("/:id", wrapAsync(showPage))

//Create Route
router.post("/", validateListing, isLoggedIn, wrapAsync(createListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing))

//Update Route
router.put("/:id", validateListing, isOwner, isLoggedIn, wrapAsync(updateListing))

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing))

module.exports = router;