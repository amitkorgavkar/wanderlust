const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../Models/review.js");

const listingSchema = new Schema({
    title:{
        type: String,
        // require: [true, "Title is required"],
        // trim: [true],
        // maxlength: [100, "Title cannot exceed 100 characters"]
    },
    description:{
        type: String,
        // required: [true, "Description is required"],
        // trim: true
    },
    image:{
        filename: {
            type: String,
            default: "listing_image"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
        },
    },
    price:{
        type: Number,
        // required: [true, "Price is required"],
        // min: [0, "Price cannot be negative"]
    },
    location:{
        type: String,
        // required: [true, "Location is required"],
        // trim: true
    },
    country:{
        type: String,
        // required: [true, "Country is required"],
        // trim: true
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({_id: { $in : listing.reviews}})
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;