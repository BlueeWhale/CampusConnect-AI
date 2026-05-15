const express = require("express");

const router = express.Router();

const Order =
require("../models/Order");

// ==========================
// CREATE ORDER
// ==========================

router.post("/create", async (req, res) => {

  try {

    const { items, total } =
      req.body;

    const order =
      await Order.create({

        items,
        total,

        status: "Pending"

      });

    res.json({

      success: true,

      order

    });

  } catch(err){

    res.status(500).json({

      message: err.message

    });

  }

});

// ==========================
// GET ALL ORDERS
// ==========================

router.get("/all", async (req, res) => {

  try {

    const orders =
      await Order.find();

    res.json({

      success: true,

      orders

    });

  } catch(err){

    res.status(500).json({

      message: err.message

    });

  }

});

// ==========================
// GET SINGLE ORDER
// ==========================

router.get("/:id", async (req, res) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    res.json(order);

  } catch(err){

    res.status(500).json({

      message: err.message

    });

  }

});

// ==========================
// UPDATE STATUS
// ==========================

router.put("/update/:id", async (req, res) => {

  try {

    const { status } =
      req.body;

    const updatedOrder =
      await Order.findByIdAndUpdate(

        req.params.id,

        { status },

        { new: true }

      );

    res.json({

      success: true,

      order: updatedOrder

    });

  } catch(err){

    res.status(500).json({

      message: err.message

    });

  }

});

module.exports = router;