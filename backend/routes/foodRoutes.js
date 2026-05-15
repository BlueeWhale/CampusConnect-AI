const express =
require("express");

const router =
express.Router();

// CONTROLLER
const foodController =
require(
  "../controllers/foodController"
);

// MULTER
const upload =
require(
  "../middleware/uploadMiddleware"
);

// ==========================
// CREATE FOOD
// ==========================

router.post(
  "/create",
  upload.single("image"),
  foodController.createFood
);

// ==========================
// GET FOODS
// ==========================

router.get(
  "/all",
  foodController.getFoods
);

module.exports = router;