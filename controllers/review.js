const { model } = require("mongoose");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.reviewPost=async (req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview)

    listing.reviews.push(newReview)

    await newReview.save();
    await listing.save();
    req.flash("success","Review Listing Created!")
    res.redirect(`/listings/${listing._id}`)
}

module.exports.destroyReview=async(req,res)=>{
    console.log("DELETE request received for:", req.params);
    let {id,reviewId}=req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!")
    res.redirect(`/listings/${id}`)
}