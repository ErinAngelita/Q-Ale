const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
  question: String,
  answer: String,
  is_Img: Boolean,
  img_Url: String
});

let question = mongoose.model('question', QuestionSchema);
module.exports = {
  question: question,
  questionSchema: QuestionSchema
};
