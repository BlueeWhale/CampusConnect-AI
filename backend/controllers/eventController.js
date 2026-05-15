const Event =
require("../models/Event");

// ==========================
// CREATE EVENT
// ==========================

const createEvent =
async (req, res) => {

  try {

    const {
      title,
      description,
      date,
      location,
      price
    } = req.body;

    // IMAGE URL
    const image =
    req.file
    ? `http://localhost:5000/uploads/${req.file.filename}`
    : "";

    // SAVE EVENT
    const event =
    await Event.create({

      title,
      description,
      date,
      location,
      price,
      image

    });

    res.status(201).json({

      success: true,
      event

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// ==========================
// GET EVENTS
// ==========================

const getEvents =
async (req, res) => {

  try {

    const events =
    await Event.find();

    res.json({

      success: true,
      events

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// EXPORTS
module.exports = {

  createEvent,
  getEvents

};