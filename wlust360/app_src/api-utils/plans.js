const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./../models/users');
const Trip = require('./../models/trips');
const Plan = require('./../models/plans');

function createPlan(req, res) {
   const slug = req.params.trip;
   console.log('Slug ', slug);

   Trip.findOne({ slug: slug}, (err, trip) => {
      // TODO: Create plan only if you're a user on the trip
      // for now user can only create plans on trips they created
      if ((''+result.createdBy) !== (''+req.decoded.id)) {
        return res.status(403).json({ success: false, plans: [] });
      } 

      if (!err) {
         new Plan({
            createdBy: trip.createdBy,
            trip: trip._id,
            title: req.body.title,
            date: req.body.date,
            notes: req.body.notes
         }).save((err, plan) => {
            if (err) { 
               return res.status(500).json({ auth: true, success: false, message: err });
            } else {
               trip.plans.push(plan._id);
               trip.save(err => {
                  if (err) { 
                     console.log('Error saving iou to trip')
                     return res.status(500).json({ auth: true, success: false, message: err, plan: [] });
                  } else {
                     return res.status(200).json({ auth: true, success: true, plan: plan });
                  }  
               });
            }  
         });
      } else {
         return res.status(500).json({ success: false, message: 'Server Error' });
      }  
   });

}

//return plans for each trip
function getPlans(req, res) {
   const slug = req.params.trip;
   console.log('Slug ', slug);
//wrap request in user id so other logged in users cannot see other users trips

   Trip.findOne({ slug: slug })
      .populate('plans')
      .exec((err, result) => {
         console.log('ERRR ', err);
         console.log('IOUS ', result);

         //TODO: See all ious user is added to, for now only sees plans that user created 
         if ((''+result.createdBy) !== (''+req.decoded.id)) {
            return res.status(403).json({ success: false, plans: [] });
         }
         if(result && !err) {
            return res.status(200).json({ success: true, plans: result.plans });
         }
         console.log('error is ', err);
         return res.status(404).json({ success: true,  message: 'Not found', plans: [] });
      });
}

module.exports = {
   createPlan,
   getPlans
}

