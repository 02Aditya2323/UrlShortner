const express=require("express");
const Url=require("../models/url");
const router=express.Router();  


router.get("/",async(req,res)=>{
    const allUrls=await Url.find({});
    return res.render("home",{urls:allUrls}); 
});

router.get("/signup",async(req,res)=>{  // we are making a login form which posts the formdata at route /user .....we can do this; i.e. the loginUser creation is at another route(/user) but on another route we can make the form in static(/signup) and post the formdata to the /user route
    return res.render ("signup")
})

router.get("/login",async(req,res)=>{  // at /login generally we are loading the login page and that login page posts the formdata at /user/login route and whatever auth. is there it happens from there
    return res.render("login")
})

module.exports=router;

