const express = require("express");
const { userScore } = require("../controllers/Dashboard/userScores");
const router = express.Router();

router.get("/userprogress/:userId", userScore);

module.exports = router;