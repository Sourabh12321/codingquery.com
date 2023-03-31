const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://gauravanand:gauravanand@cluster0.41krvku.mongodb.net/CodingQuries?retryWrites=true&w=majority");

module.exports ={
    connection
}