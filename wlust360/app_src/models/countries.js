const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({ 
   name: String,
   police: String,
   hospital: String,
   fire: String,
   lang: String
});

module.exports = mongoose.model('Country', countrySchema, 'countries');
