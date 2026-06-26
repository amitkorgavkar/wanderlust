const joi = require('joi');

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