const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diaperSchema = new Schema({
  soilType: {
    type: String,
    required: true,
  },
  childName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Diaper', diaperSchema);
