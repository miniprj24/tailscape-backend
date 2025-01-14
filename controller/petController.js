const Pet = require("../model/petModel");

exports.getAllPets = async (req, res) => {
  try {
    const pet = await Pet.find();
    res.status(200).json({ pet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
