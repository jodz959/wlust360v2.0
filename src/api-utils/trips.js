const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./../models/users');
const Trip = require('./../models/trips');

let secret;
if (process.env.NODE_ENV === 'production') {
   secret = process.env.secret;
} else {
   const config = require('./../config/config');
   secret = config.secret;
}

function createTrip(req, res) {
   const token = req.headers['x-access-token'];
   if (!token) {
      return res.status(401).json({ auth: false, message: 'No auth'});
   }
   jwt.verify(token, secret, (err, decoded) => {
      if(err) {
         return res.status(500).json({ auth: false, message: "Auth failed"});
      }
      console.log(req.body);
      console.log(req.body.title);
      User.findById(decoded.id, (err, user) => {
         if (err) {
            return res.status(404).json({ auth: false, message: "User Not Found" });
         } 
         //create new trip and add to db
         new Trip({
            createdBy: user._id,
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            dest: req.body.dest   
         }).save((err, trip) => {
            if (err) {
               return res.status(500).json({auth: false, message: err });
            } else {
               console.log('trips' , trip);
               return res.status(200).json({ success: true, user: user.email, trips: user.trips });
            }
         });
      });
   });

}

function getTrips(req, res) {
   const token = req.headers['x-access-token'];
   if (!token) {
      return res.status(401).json({ auth: false, message: 'No auth'});
   }
   jwt.verify(token, secret, (err, decoded) => {
      if(err) {
         return res.status(500).json({ auth: false, message: "Auth failed"});
      }
      //get all user trips and return them
      User.findById(decoded.id)
         .populate('trips').exec((err, result) => {
            console.log('ERRR ', err);
            console.log('TRIPS ', result);
            if(result && !err) {
               return res.status(200).json(result.trips);
            }
            return res.status(404).json({ message: 'Not found' });
         });
   });

}

module.exports = {
   createTrip,
   getTrips
}
