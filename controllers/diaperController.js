const Diaper = require('../models/Diaper');

const getAllDiapers = async (req, res) => {
  const diaper = await Diaper.find();
  if (!diaper) return res.status(204).json({ message: 'No diapers found' });
  res.json(diaper);
};

const addNewDiaper = async (req, res) => {
  if (!req?.body?.soilType || !req?.body?.childName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await Diaper.create({
      soilType: req.body.soilType,
      childName: req.body.childName,
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

// edit an existing entry
const editDiaper = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required' });
  }

  const diaper = await Diaper.findOne({ _id: req.body.id }).exec();

  if (!diaper) {
    return res
      .status(204)
      .json({ message: `Entry with ID ${req.body.id} not found` });
  }
  if (req.body?.soilType) diaper.soilType = req.body.soilType;
  if (req.body?.childName) diaper.childName = req.body.childName;

  const result = await diaper.save();
  res.json(result);
};

// delete an entry
const deleteDiaper = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required' });
  }

  const diaper = await Diaper.findOne({ _id: req.body.id }).exec();

  if (!diaper) {
    return res
      .status(204)
      .json({ message: `Entry ID ${req.body.id} not found` });
  }

  const result = await diaper.deleteOne({ _id: req.body.id });
  res.json(result);
};

// get a single entry
const getDiaperById = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Entry ID required.' });

  const diaper = await Diaper.findOne({ _id: req.params.id }).exec();
  if (!diaper) {
    return res
      .status(204)
      .json({ message: `No entry matches ID ${req.params.id}.` });
  }
  res.json(diaper);
};

module.exports = {
  getAllDiapers,
  addNewDiaper,
  editDiaper,
  deleteDiaper,
  getDiaperById,
};
