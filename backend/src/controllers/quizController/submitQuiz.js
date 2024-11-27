const { UserProgress } = require('../../models/quiz');

const submitQuiz = async (req, res)=>{
    const {userId, quizId, responses} = req.body;
    let score = 0;
    try {
        const quiz = await Quiz.findById(quizId);
    
        // Calculate score
        quiz.questions.forEach((question, index) => {
          if (question.options.some(opt => opt.isCorrect && opt.text === responses[index].answer)) {
            score++;
          }
        });
    
        // Determine badge
        let badge = 'Beginner';
        if (score > quiz.questions.length * 0.7) badge = 'Intermediate';
        if (score === quiz.questions.length) badge = 'Expert';
    
        // Update or create user progress
        await UserProgress.findOneAndUpdate(
          { userId, skill: quiz.skill },
          { userId, skill: quiz.skill, score, badge },
          { upsert: true }
        );
    
        res.json({ score, badge });
      } catch (err) {
        res.status(500).send('Error submitting quiz');
      }
}

module.exports = submitQuiz;