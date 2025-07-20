const express=require("express");
const Url = require("../models/url");

const {generateShortNewUrl,getAnalaytics}=require("../controllers/url.js");

// REST API and crud operations

const router=express.Router();  

// router.get("/test",async(req,res)=>{
//     const allUrls=await Url.find({});
//     return res.render("home");
// });

router.post("/",generateShortNewUrl);
router.get("/analytics/:shortId", getAnalaytics);



module.exports=router;

