const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = require('./QuestionSchema.js');
const RoundSchema = new Schema({
  category: String,
  roundNumber: Number,
  questions:[{ type: Schema.Types.ObjectId, ref: 'question' }]
});

let round = mongoose.model('round', RoundSchema);
module.exports = {
  round: round,
  roundSchema: RoundSchema
};
