const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./Models/listings.js");
const path = require("path");
require("dotenv").config();
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./Models/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")))

main().then((res) =>{
    console.log("Connection Successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg)
    } else {
        next()
    }
}

const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg)
    } else {
        next()
    }
}

app.get("/", (req, res) =>{
    res.send("Working");
})

//Index Route
app.get("/listings", wrapAsync(async(req, res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
}))

//New Route
app.get("/listings/new", (req, res) =>{
    res.render("listings/new.ejs")
})

//Show Route
app.get("/listings/:id", wrapAsync(async(req, res) =>{
    let { id } = req.params;
    // if(!id){
    //     throw new ExpressError(400, "Invalid request")
    // }
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });   
}))

//Create Route
app.post("/listings", validateListing, wrapAsync(async (req, res, next) =>{
    let listing = req.body.listing;
    await Listing.insertOne(listing);
    res.redirect("/listings")
}));

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async(req, res) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing })
}))

//Update Route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) =>{
    if(!req.body.listing){
        throw new ExpressError(400, "Send some valid data for listing")
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}))

//Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) =>{
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

//Reviews
//Post Route
app.post("/listings/:id/reviews", validateReview, wrapAsync(async(req, res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)

    listing.reviews.push(newReview)

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`)
}))

app.use((req, res, next) =>{
    next(new ExpressError(404, "Page not found"))
});

app.use((err, req, res, next) =>{
    let { statusCode=500, message="Something went wrong" } = err;
    if(err.name === "ValidationError"){
        status = 400;
        message = Object.values(err.errors).map(e => e.message).join(", ");
    }
    res.status(statusCode).render("Error.ejs", {message});
})

app.listen(8080, () =>{
    console.log("Server is listening to port 8080");
})
