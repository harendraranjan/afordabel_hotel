const { model } = require("mongoose");
const Listing = require("../models/listing")

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index", { allListing });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}
module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "The listing you requested doesn't exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

module.exports.createListings = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename }
    await newListing.save();
    req.flash("success", "New Listing Created!");
    console.log(newListing);
    res.redirect("/listings");

}

module.exports.renderEditeForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "The listing you requested doesn't exist!");
        return res.redirect("/listings");
    }
    let originalImage=listing.image.url;
    originalImage.replace("/upload", "/upload/w_250");
    res.render("listings/edit", { listing });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let updateListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updateListing.image = { url, filename };
    }
    await updateListing.save();
    req.flash("success", "Listing updated!");
    return res.redirect(`/listings/${id}`);
}

module.exports.DestroyListing = async (req, res) => {
    let { id } = req.params;
    try {
        const deleteList = await Listing.findByIdAndDelete(id);
        if (!deleteList) {
            req.flash("error", "The listing you requested doesn't exist!");
            return res.redirect("/listings");
        }
        req.flash("success", "Listing deleted!");
        console.log(deleteList);
        res.redirect("/listings");
    } catch (e) {
        return next(new ExpressError(400, "Error deleting listing: " + e.message));
    }
}

