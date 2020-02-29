const express = require("express");
const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  PRIVATE
router.get("/", (req, res) => {
    res.send("GET a logged-in user");
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  PUBLIC
router.post("/", (req, res) => {
    res.send("Login User");
});

module.exports = router;
