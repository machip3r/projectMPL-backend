const router = require("express").Router();

router.get("/", (request, result) => {
  result.json({
    error: null,
    data: {
      title: "Protected route",
      user: request.user,
    },
  });
});

module.exports = router;
