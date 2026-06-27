const joi = require('joi');
const review = require('./Models/review');

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title:       joi.string().required().label("Title"),
        description: joi.string().required().label("Description"),
        location:    joi.string().required().label("Location"),
        country:     joi.string().required().label("Country"),
        price:       joi.number().required().min(0).label("Price"),
        image:       joi.string().allow("", null).label("Image")
    }).required()
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5).label("Rating"),
        comment: joi.string().required().label("Comment")
    })
}).required()