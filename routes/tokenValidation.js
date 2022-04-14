const jwt = require("jsonwebtoken");

const verifyToken = (request, result, next) => {
  const token = request.header("auth-token");

  if (!token)
    return result.status(400).json({
      error: "Access denied",
    });

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);

    request.user = verified;
    next();
  } catch (error) {
    result.status(400).json({
      error: "Invalid token",
    });
  }
};

module.exports = verifyToken;
