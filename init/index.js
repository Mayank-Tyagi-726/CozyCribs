const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(()=>{
    console.log("connected to Database")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://mayanktyagi:cozycribs@cluster0.oskharw.mongodb.net/?appName=Cluster0');
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"68aedba51a94733878c5d66f"}))
    await Listing.insertMany(initData.data);
    console.log("done")
}

initDB();