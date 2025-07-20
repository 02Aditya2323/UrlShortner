const mongoose=require("mongoose");  

const connectMongodb=async(url)=>{
    return mongoose.connect(url)
};


module.exports = { connectMongodb };