const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const planSchema = new Schema({
   createdBy: { type: Schema.Types.ObjectId, ref:'User'},
   trip: { type: Schema.Types.ObjectId, ref: 'Trip'},
   title: String,
   date: Date,
   notes: String,
   users: [{ type: Schema.Types.ObjectId, ref:'User'}]
});

module.exports = mongoose.model('Plan', planSchema, 'plans');

