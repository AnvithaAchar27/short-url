const jwt = require("jsonwebtoken");

function restrictToLoggedinUserOnly(req, res, next) {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized. Please login first.",
    });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key");

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}

module.exports = {
  restrictToLoggedinUserOnly,
};