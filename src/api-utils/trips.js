const mongoose = require('mongoose');
const Trip = require('../models/trips');

function createTrip(req, res) {
   new Trip({
      title: req.body.name,
      start: req.body.start,
      end: req.body.end,
      dest: req.body.dest   
   }).save((err, trip) => {
      if (err) {
         res.send(err);
      } else {
         res.json({ success: true, trip });
      }
   });
}

module.exports = {
   createTrip
}
