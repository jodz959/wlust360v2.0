const fs = require('fs');
const mongoose = require('mongoose');
const Trip = require('./../models/trips');

const config = require('./../config/config');
mongoose.connect(config.dbURL, {useNewUrlParser: true});

/*
Updates slugs on existing trips to be more friendly
*/
function updateSlugs() {
   Trip.find({}, (err, trips) => {
      if (!err) {
         trips.forEach((item) => {
            console.log(item);
            const newSlug = item.slug.slice(0, -22);
            Trip.findByIdAndUpdate(item._id, { $set: { slug: newSlug } }, (err) => {
               if (err) {  
                  console.log('Error on update ', err);  
               }
            });
         });
      } else {
         console.log('Error retrieving trips');
         return ;
      }

   });
}

updateSlugs();
