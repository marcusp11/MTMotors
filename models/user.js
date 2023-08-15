var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  first: String,
  last: String,
  uName: String,
  email: String,
  number: String,
  psw:String,
  photo: {type: String,},

});

var User = mongoose.model('users', userSchema);
module.exports = User;