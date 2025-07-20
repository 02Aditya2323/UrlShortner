const{getUser}=require("../services/auth")


const restrictToLoggedinUserOnly=async(req, res, next)=>{ // this middleware is during login
    //Jwt stateless auth via cookie =>
    //const userUid = req.cookies?.uid; // first see if clients' request cookie have uid present
    //const user = getUser(userUid);    //verify the user with our secret key; logic is written in services
         


    //JWT auth via header verification 
    const userUid=req.headers['authorization'];  // took authorization header from request
    
    if (!userUid) return res.redirect("/login?error=Invalid credentials"); // if not then redirect to login; we are redirecting to the staticPage form of login not /user/url....the form then submits data to the login route in user...
    const token=userUid.split('Bearer ')[1];    // split the authorization header and took the jwt cz. the request that comes is in form (Bearer jwt)

    const user = getUser(token);    //verify the user with our secret key; logic is written in services
  
    if (!user) return res.redirect("/login");
  
    req.user = user; //explain this line
    next();
  }
  

  const checkAuth=async(req, res, next)=>{   
    //jwt cookie auth verify->
    //const userUid = req.cookies?.uid;
    //const user = getUser(userUid);
  

    // jwt header auth verify ->
    const userUid=req.headers['authorization'];
    if (!userUid) return res.redirect("/login?error=Invalid credentials"); // if not then redirect to login; we are redirecting to the staticPage form of login not /user/url....the form then submits data to the login route in user...
    const token=userUid.split('Bearer ')[1]; 
    const user = getUser(token); 

    req.user = user; //what does this means?
    next();
  }
  
  
module.exports={restrictToLoggedinUserOnly,checkAuth};


// JWT in Cookies vs. JSON for Mobile Browsers
// Cookies work in all browsers (desktop and mobile), but there are some caveats:
// Mobile browsers do support cookies, but if you’re building a mobile app (not a browser), cookies are not as straightforward.
// For mobile web apps (in the browser), cookies work, but you must set the SameSite and Secure flags properly for cross-site requests.
// For native mobile apps (iOS/Android), you typically store the JWT in secure storage (not cookies).
// Solution:
// For web (desktop/mobile): Use HttpOnly cookies for best security.
// For native mobile apps: Send JWT in JSON, store it in secure storage (e.g., Keychain for iOS, Keystore for Android), and send it in the Authorization header for each request.