const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();

const trip = require('../api-utils/trips');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.use(require('../middlewares/authenticated'));

router.post('/create-trip', trip.createTrip);

module.exports = router;

