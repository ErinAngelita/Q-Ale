const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import TriviaSchema from './TriviaSchema.js';
const UserSchema = new Schema({
  token_Id: String,
  username: String,
  quiz:[TriviaSchema]
});

module.exports = mongoose.model('user', UserSchema);
