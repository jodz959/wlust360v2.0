const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();

const plan = require('./../api-utils/plans');
const vt = require('./../middlewares/token');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//protected routes
//router.use(require('./../middlewares/authenticated'));
router.use(vt.validateToken);

router.post('/create-plan/:trip', plan.createPlan);
router.get('/get-plans/:trip', plan.getPlans);

module.exports = router;


