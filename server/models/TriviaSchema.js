const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoundSchema = require('./RoundSchema.js');
const TriviaSchema = new Schema({
  name: String,
  date: String,
  rounds: [{ type: Schema.Types.ObjectId, ref: 'round' }]
});

let trivia = mongoose.model('trivia', TriviaSchema);
module.exports = {
  trivia: trivia,
  TriviaSchema: TriviaSchema
};
