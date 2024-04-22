const jwt = require('jsonwebtoken');
const { jwtPassword } = require('../constants');

function CookieJWTAuth(req, res, next){
    // Retrieve JWT from cookies in the request
    console.log('in CookieJWTAuth')
    const token = req.cookies.jwt;

    if(!token){
        // Handle case where JWT is not present
        console.log("JWT not found in cookies");
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    try{
        // Verify the JWT
        const user = jwt.verify(token, jwtPassword);
        console.log(user);
        
        // Attach the user to the request object
        req.user = user;
        
        next();
    }catch(error){
        // Handle JWT verification error
        console.log("JWT verification issue")
        return res.status(401).json({ msg: 'Unauthorized' });
    }
}

module.exports = CookieJWTAuth;