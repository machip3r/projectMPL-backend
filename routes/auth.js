const router = require("express").Router();
const User = require("../models/user.js");
const Joi = require("@hapi/joi");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const schemaRegister = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(10).max(1024).required().email(),
  password: Joi.string().min(8).max(1024).required(),
});

router.post("/register", async (request, result) => {
  const {error} = schemaRegister.validate(request.body);
  const emailExists = await User.findOne({
    email: request.body.email,
  });

  if (error) return result.status(400).json({error: error.details[0].message});
  if (emailExists)
    return result.status(400).json({
      error: "The email exists already",
    });

  /* const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(request.body.password, salt); */

  const user = new User({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
  });

  try {
    const savedUser = await user.save();

    result.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    result.status(400).json(error);
  }
});

const schemaLogin = Joi.object({
  email: Joi.string().min(10).max(1024).required().email(),
  password: Joi.string().min(8).max(1024).required(),
});

router.post("/login", async (request, result) => {
  const {error} = schemaLogin.validate(request.body);
  const userExists = await User.findOne({
    email: request.body.email,
  });

  if (error) return result.status(400).json({error: error.details[0].message});
  if (!userExists)
    return result.status(400).json({
      error: "The email doesn't exists",
    });

  /* const correctPassword = await bcrypt.compare(
    request.body.password,
    userExists.password
  ); */

  if (request.body.password != userExists.password)
    return result.status(400).json({
      error: "The password is incorrect",
    });

  const token = jwt.sign(
    {
      name: userExists.name,
      id: userExists._id,
    },
    process.env.SECRET_TOKEN
  );

  result.header("auth-token", token).json({
    error: null,
    data: {token},
  });

  /* result.json({
    error: null,
    data: "Welcome",
  }); */
});

module.exports = router;
