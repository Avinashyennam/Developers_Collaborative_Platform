const express = require("express");
const router = express.Router();
const getQuizes = require("../controllers/quizController/attemptQuiz/getQuizes")
const submitQuiz = require("../controllers/quizController/attemptQuiz/submitQuiz");
const { createQuiz, addQuestions } = require("../controllers/quizController/createQuizes/create");
router.get("/get/:skill", getQuizes);
router.post("/submit-quiz", submitQuiz);
router.post("/create-quiz", createQuiz);
router.post("/add-questions/:quizId", addQuestions);
module.exports = router;