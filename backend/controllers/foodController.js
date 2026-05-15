const Food =
require("../models/Food");

// ==========================
// CREATE FOOD
// ==========================

const createFood =
async (req, res) => {

  try {

    const {
      name,
      price,
      description
    } = req.body;

    // IMAGE URL
    const image =
    req.file
    ? `http://localhost:5000/uploads/${req.file.filename}`
    : "";

    // SAVE FOOD
    const food =
    await Food.create({

      name,
      price,
      description,
      image

    });

    res.status(201).json({

      success: true,
      food

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// ==========================
// GET FOODS
// ==========================

const getFoods =
async (req, res) => {

  try {

    const foods =
    await Food.find();

    res.json({

      success: true,
      foods

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {

  createFood,
  getFoods

};