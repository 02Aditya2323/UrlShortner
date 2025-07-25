const express=require("express");
const  router=express.Router();  

const {handleUserSignup,handleUserLogin,handleuserLogout}=require("../controllers/user")
const User = require("../models/user");


router.post("/",handleUserSignup)
router.post("/login",handleUserLogin)
router.post("/logout",handleuserLogout)
module.exports = router;

// this route /user is created only for auth; directly we can go to /user/login or /signup ; but we use this route in middelware i.e. verifying if user isnt loggedin then redirecting them to this routes