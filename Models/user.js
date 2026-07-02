// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose").default

// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true
//     }
// })


// //Used becuase it automaticaly implements username, password hashing, salting
// userSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose);

// Fix: passport-local-mongoose@9.1.0's internal findByUsername still uses
// callback-style exec(), which Mongoose 7+ no longer supports.
// This override does the same lookup but with promise-based exec().
userSchema.statics.findByUsername = function(username, opts) {
    let query = this.findOne({ username: username });
    if (opts && opts.selectHashSaltFields) {
        query.select("+hash +salt");
    } else {
        query.select("+hash +salt"); // needed for both login and deserialize
    }
    if (opts && opts.session) {
        query.session(opts.session);
    }
    return query.exec(); // no callback — returns a Promise, compatible with Mongoose 9
};

module.exports = mongoose.model("User", userSchema);