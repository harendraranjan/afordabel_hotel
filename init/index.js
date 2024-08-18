const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/collage";

main().
    then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Listing.deleteMany({});
    const initDatata = initData.data.map(listing => ({
        ...listing,
        image: {
            filename: listing.image.filename,
            url: listing.image.url
        },
        owner:"66bf6c9580df743adcc64134"
    }));
    
    await Listing.insertMany(initDatata);
    console.log("Data was initialized");
};

initDB();