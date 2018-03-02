const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import QuestionSchema from './QuestionSchema.js';
const RoundSchema = new Schema({
  category: String,
  roundNumber: Number,
  questions:[QuestionSchema]
});

let round = mongoose.model('round', RoundSchema);
module.exports = {
  round: round,
  roundSchema: RoundSchema
};
