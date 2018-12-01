const fs = require('fs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./../models/users');
const Trip = require('./../models/trips');
const IOU = require('./../models/ious');

function createIOU(req, res) {
   const slug = req.params.trip;
   console.log('Slug ', slug);

   Trip.findOne({ slug: slug}, (err, trip) => {
      // TODO: Create project only if you're a user on the trip
      // for now user can only create ious on trips they created
      if ((''+result.createdBy) !== (''+result._id)) {
        return res.status(403).json({ success: false, ious: [] });
      }

      if (!err) {
         new IOU({
            createdBy: trip.createdBy,
            trip: trip._id,
            title: req.body.title,
            date: req.body.date,
            total: req.body.total,
            notes: req.body.notes
         }).save((err, iou) => {
            if (err) {
               return res.status(500).json({ auth: true, success: false, message: err });
            } else {
               trip.ious.push(iou._id);
               trip.save(err => {
                  if (err) {
                     console.log('Error saving iou to trip')
                     return res.status(500).json({ auth: true, success: false, message: err });
                  } else {
                     return res.status(200).json({ auth: true, success: true, iou: iou });
                  }
               });
            }
         });
      } else {
         return res.status(500).json({ success: false, message: 'Server Error' });
      }
   });

}

//return ious for each trip
function getIOUs(req, res) {
   const slug = req.params.trip;
   console.log('Slug ', slug);
//wrap request in user id so other logged in users cannot see other users trips

   Trip.findOne({ slug: slug })
      .populate('ious')
      .exec((err, result) => {
         console.log('ERRR ', err);
         console.log('IOUS ', result);

         //TODO: See all ious user is added to, for now only sees ious that user created 
         if ((''+result.createdBy) !== (''+req.decoded.id)) {
            return res.status(403).json({ success: false, ious: [] });
         } 
         if(result && !err) {
            return res.status(200).json({ success: true, ious: result.ious });
         }
         console.log('error is ', err);
         return res.status(404).json({ success: true,  message: 'Not found', ious: [] });
      });
}

module.exports = {
   createIOU,
   getIOUs
}
