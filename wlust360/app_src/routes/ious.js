const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();

const iou = require('./../api-utils/ious');
const vt = require('./../middlewares/token');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//protected routes
//router.use(require('./../middlewares/authenticated'));
router.use(vt.validateToken);

router.post('/create-iou/:trip', iou.createIOU);
router.get('/get-ious/:trip', iou.getIOUs);

module.exports = router;

