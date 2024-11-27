const { Quiz } = require("../../../models/quiz");

const createQuiz = async (req, res) => {
    const { title, skill, questions } = req.body;

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
        res.status(201).json({ message: 'Quiz created successfully!', quiz: newQuiz });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create quiz. Please try again later.' });
      }
}

module.exports = {createQuiz};