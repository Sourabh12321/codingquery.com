const express = require("express");
const { QuestionModel } = require("../Schema/question.schema");
const { validateUser } = require("../middlewares/authentication");
const moment = require("moment");
const questionRouter = express.Router();

//To get All Data
questionRouter.get("/getAllQuestions", async (req, res) => {
  const allQuestions = await QuestionModel.find();
  res.json(allQuestions);
});

//To post question to backend
questionRouter.post("/addquestion", validateUser, async (req, res) => {
  const { name, description, title, email } = req.body;
  try {
    const new_question = new QuestionModel({
      name,
      title,
      description,
      email,
      Time: moment().format("h:mm:ss a"),
      Date: moment().format("MMMM Do YYYY"),
    });
    await new_question.save();
    res.json(new_question);
  } catch (error) {
    console.log(error);
    res.json("Something Went Wrong Whie Add Question route");
  }
});
//To add answer to backend
questionRouter.post("/addans", validateUser, async (req, res) => {
  const { name, answer, userid, email, _id } = req.body;
  const userEmail = await QuestionModel.findOne({ _id: _id });
  question_id = userEmail._id
  try {
    if (_id == userEmail._id) {
      const add_ans = await QuestionModel.updateOne(
        { _id: _id },
        {
          $push: {
            answer: {
              name,
              answer,
              userid,
              Time: moment().format("h:mm:ss a"),
              Date: moment().format("MMMM Do YYYY"),
            },
          },
        }
      );
      console.log(add_ans);
     let question_id =  await QuestionModel.find({_id:_id})
      res.json(question_id);
    } else {
      res.json("Invalid User");
    }
  } catch (error) {
    console.log(error);
    res.json("Something went wrong while add answer route");
  }
});

// questionRouter.get(`/getUpdatedData/${question_id}`,validateUser,async(req,res)=>{
//     const {question_id} = req.body
//     const data = await QuestionModel.find({_id:question_id})
//     res.json(data)
// })

module.exports = {
  questionRouter,
};
