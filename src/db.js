const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceRSchema = new Schema({
   fName: String,
   lName: String,
   email: String,
   phone: String,
   posts: [{ type: Schema.Types.ObjectId, ref:'Posts'}]
});

const servicePSchema = new Schema({
   fName: String,
   lName: String,
   email: String,
   phone: String,
   experience: [{ type: Schema.Types.ObjectId, ref:'Experience'}],
   reference: [{ type: Schema.Types.ObjectId, ref:'Reference'}],
   reviews: [{ type: Schema.Types.ObjectId, ref:'Review'}]
});

//add models and connect db
mongoose.model('UserSR', serviceRSchema);
mongoose.model('UserSP', servicePScehma);
mongoose.connect('mongodb://localhost/dayswork', {useNewUrlParser: true});
