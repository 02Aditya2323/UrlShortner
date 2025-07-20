const express=require("express");
const app =express();
const path=require("path");
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUsersOnly,checkAuth}=require("./middleware/auth")
const {connectMongodb}=require("./connections.js");    //require mongoDb connection
const URl=require("./models/url.js");

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
//middleware:
app.use(express.urlencoded({extended:false}));  
app.use(express.json()); 
app.use(cookieParser());


//Routes: //require router
const staticRoute=require("./routes/staticRouter.js");
const urlRoute = require("./routes/url.js")      
const userRoute=require("./routes/user.js");   

//DB connection: 
connectMongodb("mongodb://127.0.0.1:27017/Short-Url").then(()=>console.log("MONGODB CONNECTED, YAY"));   

// Routes: 2routes: 1. urlRoute 2. staticRoute
app.use("/url",restrictToLoggedInUsersOnly,urlRoute);  // this route for generating shortUrl and getting analytics of a particular shortUrl only to loggedinusers
app.use("/",checkAuth,staticRoute);  // this is default route of our weebsite which basically fetches all the users from database and shows them on home page; also the html pages for login and signup routes for middleware are here, i.e. the forms are here and they gets posted to /user route where entire auth managament happens
app.use("/user",userRoute); // this route is for user signup and login---> but the page form we see gets fetched from static routes 


// the services we are generating are used in 2; Setuser in /user/login =>handleUserLogin to generate the jwt for user; and one in middleware to verify the jwt of user before each route 
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URl.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    if (!entry) {
        return res.status(404).send("⚠️ Short URL not found!");
    }

    res.redirect(entry.redirectURL);
},checkAuth);
  
app.listen(8080,()=> console.log("server started"));


// Async tasks are non-blocking — they allow the rest of the code to run while waiting in the background.
// Inside an async function, await pauses the execution at that point until the awaited task finishes. Then, the function continues to the next line.”