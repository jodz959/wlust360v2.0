const jwt = require('jsonwebtoken');

let secret;
if (process.env.NODE_ENV === 'production') {
   secret = process.env.secret;
} else {
   const config = require('./../config/config');
   secret = config.secret;
}

//middleware to handle web token checking
const validateToken = (req, res, next) => {
   const token = req.headers['x-access-token'];
   if (token) {
      jwt.verify(token, secret, (err, decoded) => {
         if(err) {
            return res.status(500).json({ auth: false, success: false, message: "Auth failed"});
         }
      
         req.decoded = decoded;
         next();
      });
   } else {
      return res.status(403).json({ auth: false, success: false, message: "No Access Token Found"});
   }
}

module.exports = { validateToken };
