const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = require('./QuestionSchema.js');
const RoundSchema = new Schema({
  category: String,
  questions:[{ type: Schema.Types.ObjectId, ref: 'question' }]
});

let round = mongoose.model('round', RoundSchema);
module.exports = {
  round: round,
  RoundSchema: RoundSchema
};
