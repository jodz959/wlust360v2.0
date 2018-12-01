const fs = require('fs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./../models/users');
const Trip = require('./../models/trips');
const Country = require('./../models/countries');

let secret;
if (process.env !== undefined) {
   if (process.env.NODE_ENV === 'production') {
      secret = process.env.secret;
   }
} else {
   const config = require('./../config/config');
   secret = config.secret;
}

function createTrip(req, res) {
   //make sure country data exists
      User.findById(req.decoded.id, (err, user) => {
         if (err) {
            return res.status(404).json({ auth: false, message: "User Not Found" });
         } 
         //create new trip and add to db
         new Trip({
            createdBy: user._id,
            title: req.body.title,
            start: req.body.start.slice(0, -22),
            end: req.body.end.slice(0, -22),
            dest: req.body.dest   
         }).save((err, trip) => {
            if (err) {
               return res.status(500).json({auth: false, message: err });
            } else {
               console.log('trips' , trip);
               // push the reeference to the trip to user
               user.trips.push(trip._id);
               user.save(error => {
                  if (!error) {
                     //get the associated country
                     const dest = req.body.dest.split(/,/);
                     let place;
                     if (dest.length === 1) {
                        place = dest[0].toLowerCase();
                     } else { //get last item
                        place = dest[dest.length - 1].toLowerCase();
                     } 
                     //add country to get health info
                     Country.findOne({ name: place }, (err, country) => {
                        if (country === undefined || country === null) {
                           console.log('Error saving country to trip');
                           //return trip if the country is not found
                           return res.status(200).json({ auth: true , success: true, user: user.email, trip: trip });
                        } else {
                        trip.country = country._id;
                           return res.status(200).json({ auth: true ,success: true, user: user.email, trip: trip });
                        }
                     });
                  }
               });   
            }
         });
      });
}

function getTrips(req, res) {
   //return all user trips and the country for each trip 
   
   User.findById(req.decoded.id)
      .populate({ path: 'trips', populate: { path: 'country'} }).exec((err, result) => {
         console.log('ERRR ', err);
         console.log('TRIPS ', result);
         if(result && !err) {
            return res.status(200).json({ success: true, trips: result.trips });
         }
         return res.status(404).json({ success: true,  message: 'Not found' });
   });
}



module.exports = {
   createTrip,
   getTrips
}
