const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TriviaSchema = require('./TriviaSchema.js');
const UserSchema = new Schema({
  tokenSub: String,
  trivias: [{ type: Schema.Types.ObjectId, ref: 'trivia' }]
});

module.exports = mongoose.model('user', UserSchema);
