var db = require('../libs/db');
var crypto = require('crypto');

var UserSchema = new db.Schema({
  username    : {type : String, unique: true}
  , password  : String
  , email     : String
})

var myUser = db.mongoose.model('User', UserSchema);
//Exports
// Add user to databse
module.exports = {
  User: myUser,
  addUser: function(username, password, email, callback) {
    var instance = new myUser();
    instance.username = username;
    instance.password = password;
    instance.email = email;
    saltAndHash(instance.password, function(hash){
      instance.password = hash;
      instance.save(function(err) {
        if (err) {
          callback(err)
          } else {
            callback(null, instance);
          }
      });
    });
}
}

/* private encryption & validation methods */

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

