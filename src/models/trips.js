const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const tripSchema = new Schema({
   title: String,
   start: Date,
   end: Date,
   dest: String,
   users:[{ type: Schema.Types.ObjectId, ref:'User'}]
});

tripSchema.plugin(URLSlugs('title start'));
module.exports = mongoose.model('Trip', tripSchema);

