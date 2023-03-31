const mongoose = require("mongoose");

const QuestionSchma = mongoose.Schema({
    email:String,
    name:String,
    Date:{type: Date, default: Date.now()},
    title:String,
    description:String,
    votes:Number,
    answer:{type:Array,default:[]},
})

const QuestionModel = mongoose.model("questions",QuestionSchma)

module.exports={
    QuestionModel
}