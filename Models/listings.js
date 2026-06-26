const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    ]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;