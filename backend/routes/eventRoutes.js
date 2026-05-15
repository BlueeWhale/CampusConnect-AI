const express = require("express");

const router = express.Router();

// CONTROLLER IMPORT
const eventController = require(
  "../controllers/eventController"
);

// MULTER
const upload = require(
  "../middleware/uploadMiddleware"
);

// ==========================
// CREATE EVENT
// ==========================

router.post(
  "/create",
  upload.single("image"),
  eventController.createEvent
);

// ==========================
// GET EVENTS
// ==========================

router.get(
  "/all",
  eventController.getEvents
);

module.exports = router;