const express = require("express");
const router = express.Router();
const getQuizes = require("../controllers/quizController/getQuizes")
const submitQuiz = require("../controllers/quizController/submitQuiz");
router.get("/get/:skill", getQuizes);
router.post("/submit-quiz", submitQuiz);

module.exports = router;