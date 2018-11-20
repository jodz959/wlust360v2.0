const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const bcrypt = require('bcryptjs');

//get saltRounds
let saltRounds;
if (process.env.NODE_ENV === 'production') {
   saltRounds = process.env.saltRounds; 
} else {
   const config = require('../config/config');
}

const userSchema = new Schema({
   fName: String,
   lName: String,
   email: String,
   phone: String,
   home: String,
   pwHash: String,
   trips: [{ type: Schema.Types.ObjectId, ref:'Trip'}],
   healthInfo: [{type: Schema.Types.ObjectId, ref: 'HealthInfo'}],
   trans: [{type: Schema.Types.ObjectId, ref: 'Transaction'}]
});

userSchema.methods.generateHash = function(password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(config.saltRounds), null);
}

userSchema.methods.validpw = function(password) {
   return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

