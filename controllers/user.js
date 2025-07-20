const jwt=require("jsonwebtoken");
const{setUser}=require("../services/auth")
const User = require("../models/user");
const bcrypt=require('bcrypt')    // for hashing and storing the passwords


const handleUserSignup = async (req, res) => {   //creating the user
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    });
    return res.redirect("/login"); // After signup, redirect to login
}

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
            return res.render("login", { error: "Invalid Username or Password" });
        }

        const token = setUser(user); 
        res.json({token}); 

        return res.redirect("/"); // actually this is incorrect; we cant send json token for login session and redirection to homepage after sucessful login both at the same time


    } catch (error) {
        console.error("Login error:", error);
        return res.render("login", { error: "An error occurred. Please try again." });
    }
}

module.exports={handleUserSignup,handleUserLogin};