const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const userSchema = new Schema({
   fName: String,
   lName: String,
   email: String,
   phone: String,
   home: String,
   pwHash: String,
   trips: [{ type: Schema.Types.ObjectId, ref:'Trips'}],
   healthInfo: [{type: Schema.Types.ObjectId, ref: 'HealthInfo'}],
   trans: [{type: Schema.Types.ObjectId, ref: 'Transaction'}]
});

const tripSchema = new Schema({
   title: String,
   start: Date,
   end: Date,
   dest: String,
   users:[{ type: Schema.Types.ObjectId, ref:'User'}]
});

tripSchema.plugin(URLSlugs('title start'));

const healthSchema = new Schema({
   name: String,
   pres: String,
   instr: String
});

const countrySchema = new Schema({
   name: String,
   police: String,
   fire: String,
   hospital: String,
   lang: String
});

//add models and connect db
mongoose.model('User', userSchema);
mongoose.model('Trip', tripSchema);
mongoose.model('HealthInfo', healthSchema);
mongoose.model('Country', countrySchema);
mongoose.connect('mongodb://localhost/wanderlust360', {useNewUrlParser: true});
