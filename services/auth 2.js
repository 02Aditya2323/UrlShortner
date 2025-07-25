// stateful
// const sessionIdToUserMap = new Map(); // sessionIdToUserMap is a map that stores the user object for each session id

//  const setUser=(id,user)=>{  //this function i.e. .set adds the user object coming form client cookie to the sessionIdToUserMap; means the cookied uuid geenrated during login is added in the map via this
//     sessionIdToUserMap.set(id, user);
// }

// const getUser=(id)=>{  //this function i.e. .get retrieves the user object from the sessionIdToUserMap using the session id
//     return sessionIdToUserMap.get(id);
// }




//Stateless:
const jwt=require("jsonwebtoken");
const secret="$Adi2323"
const setUser=(user)=>{
  return jwt.sign({
    _id:user._id,
    email:user.email
  },secret,{expiresIn:'1h'});
}

const getUser=(token)=>{
  if (!token) return null;
  try {
    const user = jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.redirect('/login?error=Session expired, please log in again');
    }
    return res.redirect('/login?error=Invalid token');
  }
  
}

module.exports = {
  setUser,
  getUser,
};