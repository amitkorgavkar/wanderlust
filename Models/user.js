const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})


//Used becuase it automaticaly implements username, password hashing, salting
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);