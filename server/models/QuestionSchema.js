const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
  question1: String,
  answer1: String,
  question2: String,
  answer2: String,
  question3: String,
  answer3: String,
  question4: String,
  answer4: String,
  question5: String,
  answer5: String,
  question6: String,
  answer6: String,
  question7: String,
  answer7: String,
  question8: String,
  answer8: String,
  question9: String,
  answer9: String,
  question10: String,
  answer10: String,
});

let question = mongoose.model('question', QuestionSchema);
module.exports = {
  question: question,
  QuestionSchema: QuestionSchema
};
