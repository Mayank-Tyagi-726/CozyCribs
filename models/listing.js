const mongoose = require("mongoose");
const Review = require("./review.js")

let listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
     description:{
        type:String
    },

     image:{
        type:String,
        default:"https://unsplash.com/photos/coconut-tree-near-shore-within-mountain-range-RN6ts8IZ4_0",
        set:(v)=> {
            // If v is empty string, set default
            if(v === "" || v === undefined) {
                return "https://unsplash.com/photos/coconut-tree-near-shore-within-mountain-range-RN6ts8IZ4_0";
            }
            return v;
        }
     },
     price:{
        type:Number
    },
     location:{
        type:String
    },
     country:{
        type:String
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;