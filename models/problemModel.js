const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    type:{
        type: String,
        required: [true, "A problem must have a type"]
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "A problem must belong to a user"]
    }
});

problemSchema.pre(/^find/ , function(next){
     this.populate({
       //for user
       path: "user",
       select: "-__v -passwordChangedAt",
     });
     next();
})

const Problem =mongoose.model("Problem", problemSchema)
module.exports = Problem;

