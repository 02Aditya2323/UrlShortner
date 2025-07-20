const mongoose =require("mongoose");

const UrlScehma=new mongoose.Schema({
     shortId:{
        type:String,
        unique:true,
        required:true,
     },
     redirectUrl:{
        type:String,
        required:true,
     },
     visitHistory:[{timestamps:{type:Number}}],
     
     createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
},
    {timestamps:true}          // this is schemaOptions or optionsObject of schema......These are settings you give to Mongoose to customize schema behavior.
);


const URL= mongoose.model("url",UrlScehma);

module.exports=URL;