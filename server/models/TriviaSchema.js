const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import RoundSchema from './RoundSchema.js';
const TriviaSchema = new Schema({
  name: String,
  date: String,
  rounds: [RoundSchema]
});

let trivia = mongoose.model('trivia', TriviaSchema);
module.exports = {
  trivia: trivia,
  triviaSchema: TriviaSchema
};
