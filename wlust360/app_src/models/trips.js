const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const tripSchema = new Schema({
   createdBy: { type: Schema.Types.ObjectId, ref:'User'},
   title: String,
   start: Date,
   end: Date,
   dest: String,
   users: [{ type: Schema.Types.ObjectId, ref:'User' }],
   ious: [{ type: Schema.Types.ObjectId, ref:'IOU' }],
   plans: [{ type: Schema.Types.ObjectId, ref:'Plan' }],
   country: { type: Schema.Types.ObjectId, ref:'Country'}
});

tripSchema.plugin(URLSlugs('title start'));
module.exports = mongoose.model('Trip', tripSchema, 'trips');

