const router = require("express").Router();
const User = require("../models/User.js");
const Joi = require("@hapi/joi");

const schemaRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

router.post("/register", async (request, result) => {
  const {error} = schemaRegister.validate(req.body);

  if (error) return result.status(400).json({error: error.details[0].message});

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

module.exports = router;
