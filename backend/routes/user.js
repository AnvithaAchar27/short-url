const express = require("express");

const {
  handleUserRegister,
  handleUserLogin,
} = require("../controllers/user");

const {
  restrictToLoggedinUserOnly,
} = require("../middleware/auth");

const router = express.Router();

router.post("/register", handleUserRegister);

router.post("/login", handleUserLogin);

router.get("/profile", restrictToLoggedinUserOnly, (req, res) => {
  return res.json({
    message: "You can access this protected route",
    user: req.user,
  });
});

module.exports = router;