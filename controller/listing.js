const Listing = require("../models/listing")

module.exports.allListings = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings})
}