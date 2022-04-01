const router = require("express").Router();
const User = require("../models/user.js");

router.post("/register", async (request, result) => {
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
