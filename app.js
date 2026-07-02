const express = require("express");
const app = express(); 
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js")
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user.js");


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

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/demouser", async(req, res) =>{
//     let fakeUser = new User({
//         email: "student123@gmail.com",
//         username: "delta-student"
//     })

//     let registeredUser = await User.register(fakeUser, "Helloworld")
//     res.send(registeredUser);
// })

app.use("/listings/:id/reviews", reviewsRouter);
app.use("/listings", listingRouter);
app.use("/", userRouter);

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
