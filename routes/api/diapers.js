const express = require('express');
const router = express.Router();

const diaperController = require('../../controllers/diaperController');

router.route('/').get(diaperController.getAllDiapers);

module.exports = router;
