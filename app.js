const express= require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path =  require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const review = require("./models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const {isLoggedIn} = require("./middleware.js");
const {saveRedirectUrl} = require("./middleware.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.static(path.join(__dirname,"/uploads")));




//Database.....
main().then(()=>{
    console.log("connected to Database")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://mayanktyagi:cozycribs@cluster0.oskharw.mongodb.net/?appName=Cluster0');
}

const sessionOptions = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
};



app.use(session(sessionOptions));
app.use(flash());   


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//routes.....
app.get("/",(req,res)=>{
    res.render("./listings/home.ejs");
});


app.get("/listings",wrapAsync(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}));


//create app
app.get("/listings/new",isLoggedIn,(req,res)=>{
  
    res.render("./listings/new.ejs");

})

app.post("/listings", isLoggedIn, upload.single('listing[image]'), wrapAsync(async(req,res)=>{
    let listing = req.body.listing;
    let newlisting = new Listing({

        title:listing.title,
        description:listing.description,
        price:parseFloat(listing.price),
        location:listing.location,
        country:listing.country

    });
    if(req.file) {
        newlisting.image = req.file.path;
    }
    newlisting.owner = req.user._id;

    await newlisting.save();
    req.flash("success","new listing is created")
    res.redirect("/listings");
}))


//show app
app.get("/listings/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    const {id} = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");

    if(!listing){
        req.flash("error","the id does not exists or deleted");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listing});
}))

//edit and update app
app.get("/listings/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
    const {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","the id does not exists or deleted");
        return res.redirect("/listings");
    }
    res.render("./listings/edit.ejs",{listing});
}))

app.put("/listings/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    const {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(req.user._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    let updatedListing = req.body.listing;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success" , "changes made successfully");
    res.redirect(`/listings/${id}`)
}));

app.delete("/listings/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","the listing is deleted successfully");
    res.redirect("/listings");

}));

//review app
app.post("/listings/:id/reviews",isLoggedIn,wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id)
    let newReview = new review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();


    res.redirect(`/listings/${listing._id}`);

}))

app.delete("/listings/:id/reviews/:reviewId",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;
    let reviewToDelete = await review.findById(reviewId);
    if(!reviewToDelete.author || !reviewToDelete.author.equals(req.user._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}))



//authentication !!  ! ! ! ! !
app.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs")
})

app.post("/signup",wrapAsync(async (req,res)=>{
   try{
     let {username , email, password} = req.body;
    const newUser = new User({email,username});
    let regUser = await User.register(newUser,password);
    req.login(regUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success" , "welcome to the CozyCribs ! we welcome you")
        res.redirect("/listings")
    })

   }catch(e) {
    req.flash("error",e.message);
    res.redirect("/signup");
   }

}));



app.get("/login",(req,res)=>{
    res.render("./users/login.ejs");
})

app.post("/login",saveRedirectUrl, 
  passport.authenticate('local', { failureRedirect: '/login' , failureFlash:true }),
  function(req, res) {
    req.flash("success","Welcome back to CozyCribs");
    let redUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redUrl);
  });


app.get("/logout",wrapAsync(async(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you have logged out successfully");
        res.redirect("/listings");

    })
}));











//error handling
app.all("*",(req,res,next)=>{
    next(new ExpressError("Page Not Found",404));
})

app.use((err,req,res,next)=>{
    const {statusCode=500,message = "Something went wrong"}= err;    

    res.render("error.ejs",{err});
});



//server





app.listen(8080,()=>{
    console.log("listening to the server");
})