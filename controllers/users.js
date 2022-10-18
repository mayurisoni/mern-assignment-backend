const User = require("../models/users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../MiddleWare/response");
const { successResponse } = require("../MiddleWare/successResponse");
module.exports.user_register = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length >= 1) {
      errorResponse(res, 409, "Mail exists");
      // return res.status(409).json({
      //   message: "Mail exists",
      // });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          errorResponse(res, 500, err);
        } else {
          const user = new User({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
            roleradio: req.body.roleradio,
          });
          const Createduser = await user.save();
          successResponse(res, 201, "user register", Createduser);
          // res
          //   .status(201)
          //   .json({ message: "user register", Createduser: Createduser });
        }
      });
    }
  } catch (err) {
    console.log(err);
    errorResponse(res, 409, err);
  }
};

module.exports.user_login = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length < 1) {
      errorResponse(res, 404, "This User is Not Registered");
      // return res.status(404).json({
      //   message: "This User is Not Registered",
      // });
    }
    bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
      if (err) {
        errorResponse(res, 500, err);
        // res.status(500).json({
        //   error: err,
        // });
      }
      if (result) {
        const token = jwt.sign(
          { email: user[0].email, userId: user[0]._id },
          process.env.SECRET_KEY,
          {
            expiresIn: 60 * 60,
          }
        );
        successResponse(res, 200, "User LoggedIn Successfully", token);
        // return res
        //   .status(200)
        //   .json({ message: " User LoggedIn Successfully", token: token });
      }
      // res.status(401).json({ message: " Auth Failed" });
    });
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, err);
  }
};
