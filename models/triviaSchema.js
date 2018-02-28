const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const triviaSchema = new Schema({
  question: String,
  //This is where we type all the different stuff i.e.questions and categories and things
});

module.exports = mongoose.model('trivia', triviaSchema);
