// Required
const express = require("express");
const router = express.Router();
const {body} = require("express-validator")

const {signup, login, logout} = require("../controllers/authController")

// SignUp
router.post("/signup",
    body("name").isLength({min:1}),
    body("email").isEmail(),
    body("password").isLength({min:1}),
    signup);

// Login
router.post("/login",
    body("email").isEmail(),
    body("password").isLength({min:1}),
    login);

// Logout
router.get("/logout",logout);

// Export
module.exports = router;