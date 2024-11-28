const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        text: String,
        isCorrect: Boolean
    }]
});

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true},
    skill: { type: String, required: true},
    questions: [QuestionSchema]
});

const UserProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    skill: String,
    score: Number,
    badge: String
});

module.exports = {
    Quiz: mongoose.model('Quiz', QuizSchema),
    UserProgress: mongoose.model('UserProgress', UserProgressSchema),
  };