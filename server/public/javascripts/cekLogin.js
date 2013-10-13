 
var initialize = function() {
    checkLogin(runApplication);
  };
var checkLogin = function(callback) {
    $.ajax("/account/authenticated", {
      method: "GET",
      success: function() {
        return callback(true);
      },
      error: function(data) {
        return callback(false);
      }
    });
  };
  var runApplication = function(authenticated) {
    if (!authenticated) {
      window.location.hash = '/';
    } else {
      window.location.hash = 'admin';
  };
return {
    initialize: initialize
  };
});