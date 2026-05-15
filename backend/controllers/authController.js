const User =
require("../models/User");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

// REGISTER
exports.registerUser =
async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    // CHECK USER
    const existingUser =
    await User.findOne({ email });

    if(existingUser){

      return res.status(400).json({
        message:
        "User already exists"
      });
    }

    // HASH PASSWORD
    const salt =
    await bcrypt.genSalt(10);

    const hashedPassword =
    await bcrypt.hash(
      password,
      salt
    );

    // CREATE USER
    const user =
    await User.create({

      name,
      email,

      password:
      hashedPassword,

      role
    });

    res.status(201).json({

      success: true,

      user

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// LOGIN
exports.loginUser =
async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
    await User.findOne({ email });

    if(!user){

      return res.status(400).json({
        message:
        "Invalid Credentials"
      });
    }

    // PASSWORD CHECK
    const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

    if(!isMatch){

      return res.status(400).json({
        message:
        "Invalid Credentials"
      });
    }

    // TOKEN
    const token =
    jwt.sign({

      id: user._id

    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d"
    });

    res.json({

      success: true,

      token,

      user

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};