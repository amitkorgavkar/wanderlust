const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")
const Review = require("../Models/review.js");
const Listing = require("../Models/listings.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const { addReview, destroyReview } = require("../controllers/reviews.js");


//Reviews
//Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(addReview))

//Delete ROute
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(destroyReview))

module.exports = router;