const {UserProgress} = require("../../models/quiz");

const userScore = async (req, res)=>{
    const {userId} = req.params;
    try{
        const userProgress = await UserProgress.find({userId: userId});
        res.json(userProgress);
    }
    catch(error){
        res.json({message: `Internal server error: ${error}`});
    }
}

module.exports = { userScore }