const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash")

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

const sessionOpt = {
    secret: "mysupersecretcode",
    resave: false, 
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.get("/", (req, res) =>{
    res.send("Working");
})

app.use(session(sessionOpt));
app.use(flash());

app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use("/listings/:id/reviews", reviews);
app.use("/listings", listings);

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
