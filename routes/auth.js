const router = require("express").Router();

router.post("/register", async (request, result) => {
  result.json({
    error: null,
    data: "",
  });
});

module.exports = router;
