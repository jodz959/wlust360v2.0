module.exports = function (req, res, next) {
   if (req.isAuthenticated()){
      return next();
   } 
   return res.status(404).json({ auth: false, message: 'User is not logged in' });
}
