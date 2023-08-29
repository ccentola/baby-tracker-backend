const data = {
  diapers: require('../models/diapers.json'),
  setDiapers: function (data) {
    this.diapers = data;
  },
};

const getAllDiapers = (req, res) => {
  res.json(data.diapers);
};

module.exports = { getAllDiapers };
