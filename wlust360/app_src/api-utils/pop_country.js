const fs = require('fs');
const mongoose = require('mongoose');

const User = require('./../models/users');
const Trip = require('./../models/trips');
const Country = require('./../models/countries');

const config = require('./../config/config');
const dbURL = config.dbURL;

mongoose.connect(dbURL, {useNewUrlParser: true});

function readData() {
   fs.readFile('../data/country_data.csv', 'utf-8', (err, data) => {
     if (err) {
         console.log('err reading file');
         return ;
      } else {
         return process(data);
      }
   });
}

function process(data) {
   let doc = [];
   doc = data.split('\n');
   const headers = doc.slice(0, 1);
   doc.splice(0, 1);
   doc.forEach((line) => {
      line = line.trim().split(/,/);
      new Country({
         name: line[0],
         police: line[1],
         hospital: line[2],
         fire: line[3],
         lang: line[4]
      }).save((err, country) => {
         if (err) {
            console.log('server error');
            return;
         } else {
            console.log('saved country');
            return updateTrips();
         }

      });

   });
}


function updateTrips() {
   Trip.find({}, (err, trips) => {
      if (!err) {
         trips.forEach((item) => {
            console.log(item);
            const dest = item.dest.split(/,/);
            let place;
            if (dest.length === 1) {
               place = dest[0].toLowerCase();
            } else { //get last item
               place = dest[dest.length - 1].toLowerCase();
            }

            Country.findOne({ name: place }, (err, country) => {
               if (err || !country) {
                  console.log('Error saving country to trip');
               } else {
                  //trip.country.push(country._id);
                  Trip.findByIdAndUpdate(item._id, { $set: { country: country._id } }, (err) => {
                     if (err) {
                        console.log('Error in update');
                     }
                  });
               }
            });

         });
      } else {
         console.log('Error retrieving trips');
         return ;
      }

   });
}

updateTrips();
//readData();
