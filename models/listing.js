const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");
const { ref } = require("joi");

const listSchema = new Schema({
    title: {
        type: String,
        required: true 
    },
    description: String,
    image: {
        filename: String,
        url: String
    },
    price: Number,
    location: String, 
    country: String,
    reviews:[{
        type :Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

listSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})

const Listing = mongoose.model("Listing", listSchema);
module.exports = Listing; 