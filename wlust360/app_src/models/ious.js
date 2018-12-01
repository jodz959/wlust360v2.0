const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const iouSchema = new Schema({
   createdBy: { type: Schema.Types.ObjectId, ref:'User'},
   trip: { type: Schema.Types.ObjectId, ref: 'Trip'},
   title: String,
   date: Date,
   created_at: { type: Date, default: Date.now },
   total: String,
   notes: String,
   users: [{ type: Schema.Types.ObjectId, ref:'User'}]
});

module.exports = mongoose.model('IOU', iouSchema, 'ious');

