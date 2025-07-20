const shortid = require('shortid');   // using shortid module to genrate an id for each url
const URl=require("../models/url.js");

const generateShortNewUrl=async(req,res)=>{
     const body=req.body;    //body is the content of the post request
     if (!body.url) return res.status(400).json({error:"url is required"});

     const shortId=shortid();

     await URl.create({
        shortId:shortId,
        redirectUrl: body.url,
        visitHistory:[],
        createdBy:req.user._id,
     });
     return res.status(201).render("home",{id:shortId}); 
};



const getAnalaytics =async(req,res)=>{
    const shortId=req.params.shortId;
    const result= await URl.findOne({shortId});
    return res.json({totalcklics:result.visitHistory.length,
        analytics: result.visitHistory,
    })
}
module.exports={
    generateShortNewUrl,
    getAnalaytics,
};



