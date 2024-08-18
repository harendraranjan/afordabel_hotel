const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isOwner,validateListing,isLoggedIn } = require("../middleware.js");
const listingController=require("../contollers/listings.js");

const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage})



router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post( 
        isLoggedIn, 
        upload.single("listing[image]"), 
        validateListing,
        wrapAsync(listingController.createListings)
    );
    

// render new form
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get( wrapAsync(listingController.showListings))
    .put(isLoggedIn, isOwner,upload.single("listing[image]"),  validateListing, wrapAsync(listingController.updateListing))
    .delete( isLoggedIn, isOwner, wrapAsync(listingController.DestroyListing))


// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditeForm));



module.exports = router;
