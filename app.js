const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./Models/listings.js");
const path = require("path");
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

main().then((res) =>{
    console.log("Connection Successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.get("/", (req, res) =>{
    res.send("Working");
})

//Index Route
app.get("/listings", async(req, res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
})

//New Route
app.get("/listings/new", (req, res) =>{
    res.render("listings/new.ejs")
})

//Show Route
app.get("/listings/:id", async(req, res) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
})

//Create Route
app.post("/listings", (req, res) =>{
    let listing = req.body.listing;
    console.log(listing)
    res.send("Success")
})

app.listen(8080, () =>{
    console.log("Server is listening to port 8080");
})

