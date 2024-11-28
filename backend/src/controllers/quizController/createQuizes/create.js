const { Quiz } = require("../../../models/quiz");

const createQuiz = async (req, res) => {
  const { title, skill, questions } = req.body;
  // console.log(title, skill, questions);
  // Validate input
  if (!title || !skill || !questions || questions.length === 0) {
    return res.status(400).json({ error: 'All fields are required, and questions cannot be empty.' });
  }
  try {
    const newQuiz = new Quiz({
      title,
      skill,
      questions
    });

    // Save the quiz to the database
    await newQuiz.save();
    // console.log("iam here");
    res.status(201).json({ message: 'Quiz created successfully!', quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz. Please try again later.', msg: error });
  }
}

const addQuestions = async (req, res) => {
  const { quizId } = req.params;
  const { questions } = req.body;

  // Validate input
  if (!questions || questions.length === 0) {
    return res.status(400).json({ error: 'Questions cannot be empty.' });
  }

  try {
    // Find the quiz and update it with new questions
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found.' });
    }

    quiz.questions.unshift(...questions); // Append new questions
    await quiz.save();

    res.status(200).json({ message: 'Questions added successfully!', quiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add questions. Please try again later.' });
  }
}

module.exports = { createQuiz, addQuestions };