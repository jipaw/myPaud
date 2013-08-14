var mongoose  = require('mongoose');
var Schema = mongoose.Schema;


module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

var dbHost 		= 'localhost';
var dbName 		= 'paudKu';
connect();


/* establish the database connection */
function connect(){
  var dbURL = 'mongodb://' + dbHost + '/' + dbName;
  mongoose.connect(dbURL);
  console.log('connected to database : ' + dbName);
  }
