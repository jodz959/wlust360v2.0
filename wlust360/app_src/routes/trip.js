const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();

const trip = require('./../api-utils/trips');
const vt = require('./../middlewares/token');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//protected routes
//router.use(require('./../middlewares/authenticated'));
router.use(vt.validateToken);

router.post('/create-trip', trip.createTrip);
router.get('/get-trips', trip.getTrips);

module.exports = router;

