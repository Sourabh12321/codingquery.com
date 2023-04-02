const mongoose = require("mongoose");


const QuestionSchma = mongoose.Schema({
    email:{type:String,Unique:true},
    name:String,
    Date:{type: String},
    Time:{type:String},
    title:String,
    description:String,
    votes:Number,
    answer:{type:Array,default:[]},
    userid:String
},{
    userid:false
})

const QuestionModel = mongoose.model("questions",QuestionSchma)

module.exports={
    QuestionModel
}