var User = require('../models/User')

module.exports = {
  authenticate: function(username, password, callback) {
  User.findOne('users', {username: username}, function(err,user) {
    if (user)
      callback(err, user._id);
    else
      callback(err, null);
    });
  }
}
