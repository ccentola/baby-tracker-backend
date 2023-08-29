const express = require('express');
const router = express.Router();

const diaperController = require('../../controllers/diaperController');

router
  .route('/')
  .get(diaperController.getAllDiapers)
  .post(diaperController.addNewDiaper)
  .put(diaperController.editDiaper)
  .delete(diaperController.deleteDiaper);

router.route('/:id').get(diaperController.getDiaperById);

module.exports = router;
