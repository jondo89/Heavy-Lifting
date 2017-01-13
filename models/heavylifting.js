
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
var heavylifting;
 

var heavylifting = mongoose.Schema({
'value' :String,
'name' :String,
'detail' :String,
'objectType' :String,
'entry' :Schema.Types.Mixed,
'parentid' :String,
'name' :String,
'cvid' :String,
'userID' :String,
'revision' :{ type: String, default: 'created' },
'created' : { type: Date, default: Date.now },
'active' : { type: Boolean, default: true },
}, { collection: 'inputdata' });


module.exports = heavylifting = mongoose.model('heavylifting', heavylifting);


 