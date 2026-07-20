const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../Models/listings.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, renderNewForm, showPage, createListing, editListing, updateListing, deleteListing, searchListing } = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudeConfig.js");
const upload = multer({ storage });

router.route("/").get(wrapAsync(index))
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(createListing));

//Search Route
router.get("/search", wrapAsync(searchListing))

//New Route
router.get("/new", isLoggedIn, renderNewForm);

router.route("/:id").get(wrapAsync(showPage)).put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing))


module.exports = router;