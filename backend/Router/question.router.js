const express = require("express");
const { QuestionModel } = require("../Schema/question.schema");
const { validateUser } = require("../middlewares/authentication");
const moment = require("moment")
const questionRouter = express.Router();

console.log()

questionRouter.get("/getAllQuestions",async(req,res)=>{
    const allQuestions = await QuestionModel.find()
    res.json(allQuestions)
})

questionRouter.post("/addquestion",validateUser, async (req, res) => {
    const { name,description,title,email,Time } = req.body;
    try {
        const new_question = new QuestionModel({
            name,
            title,
            description,
            email,
            Time:moment().format('h:mm:ss a'),
            Date:moment().format('MMMM Do YYYY'),
        });
        await new_question.save();
        res.json(new_question)
    } catch (error) {
        console.log(error)
    }
})

// questionRouter.post("/postQuestion", async (req,res)=>{
//     console.log("Hello")
//     const {email,name,title,description,votes,answer,views} = req.body;
//     const userEmail = await QuestionModel.find({email:email})
//     try {
//         if(userEmail.length == 0){
//             return res.send("You Have to Login First")
//         }else{
//             const userDetails = new QuestionModel({
//                 email,
//                 name,
//                 title,
//                 description,
//                 votes,
//                 answer,
//                 views
//             })
//             await userDetails.save();
//             res.send("Question Posted !!!")
//         }
//     } catch (error) {
//         console.log(error);
//         res.send("Error While Posting Questions")
//     }
// })

module.exports ={
    questionRouter
}