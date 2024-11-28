// const express = require('express');
const { Quiz } = require('../../../models/quiz');

// Fetch quizzes by skill
const getQuizes = async (req, res)=>{
    try {
        const quizzes = await Quiz.find({ skill: req.params.skill });
        res.json(quizzes);
      } catch (err) {
        res.status(500).send('Error fetching quizzes');
      }
}

module.exports = getQuizes;
