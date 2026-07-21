const Listing = require("../Models/listings")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req, res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
};

module.exports.renderNewForm = (req, res) =>{
    res.render("listings/new.ejs")
};

module.exports.showPage = async(req, res) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings")
    }else{
        res.render("listings/show.ejs", { listing });
    }   
};

module.exports.createListing = async (req, res, next) =>{
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    })
    .send()
    // res.send("done!");

    let url = req.file.path;
    let filename = req.file.filename;
    let listing = req.body.listing;
    listing.owner = req.user._id;
    listing.image = {url, filename}
    listing.geometry = response.body.features[0].geometry;
    let savedListing = await Listing.insertOne(listing);
    req.flash("success", "New Lisitng Created!")
    res.redirect("/listings")
};

module.exports.editListing = async(req, res) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings")
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250") 
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) =>{
    let { id } = req.params;
    // let listing = await Listing.findById(id);
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success", "Lisitng Updated!")
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) =>{
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Lisitng Deleted!")
    res.redirect("/listings");
}

module.exports.searchListing = async(req, res) =>{
    let { q, searchCategory } = req.query;
    if(searchCategory){
        const allListings = await Listing.find({ category: searchCategory });
        if(allListings.length === 0){
            req.flash("error", "Currently not available!")
            return res.redirect("/listings")
        }
        return res.render("listings/index.ejs", { allListings })
    }else{
        if(!q || q.trim() === ""){
            req.flash("error", "Please enter something to search for!");
            return res.redirect("/listings");
        }

        let regex = new RegExp(q, "i");
        const allListings = await Listing.find({
            $or: [
                {title: regex},
                {location: regex},
                {country: regex}
            ]
        })

        if(allListings.length === 0){
            req.flash("error", `No listings found for "${q}"`)
            return res.redirect("/listings")
        }
        return res.render("listings/index.ejs", {allListings})
    }
}