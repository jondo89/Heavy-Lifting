var heavyliftingModel      = require('../models/heavylifting.js');
var siteName = 'Heavy-lifting'

exports.getCollectionData = function(req, res) {
var types = req.param('objectType')
var showall = req.param('showall')
var userid
if (req.user) {
                 userid = req.user.id
               } else {
                 userid=''
               }
if (showall == 'true') {
    var query = heavyliftingModel.find(
    {
      "objectType": types ,    
    })
} else {
  var query = heavyliftingModel.find(
  {
    "active": true ,
    "objectType": types , 
  })
}
query.exec(function (err, docs1) {
  if (err) { return next(err); }
    res.send(JSON.stringify(docs1))
  })
};
 
///////////////////////////////////////////////////
////       DEPLOY THE HANDLEBARS FORM         //// 
/////////////////////////////////////////////////
exports.getform = function(req, res) {
var formdata = req.param('formdata')
var idItem = req.param('idItem')
var raw = req.param('raw')

if (raw =='true') {
} else {
  raw ='false'
}

if (!idItem) {
  idItem ='emptystring'
}
    res.render('form', {
      title: 'Form',
      siteName : siteName,
      formdata : JSON.stringify(formdata),
      idItem : JSON.stringify(idItem),
      raw :raw ,
      layout: false,
    });
}



////////////////////////////////////////////////////
////       GET FORM AND DATA | ONLY FORM       //// 
//////////////////////////////////////////////////
exports.getdata = function(req, res) {
  var formdata = req.param('formdata')
  var idItem = req.param('idItem')

  var temp =""
  var query1 = heavyliftingModel.find(
  {
    "_id":  idItem 
  }
  )
  var query = heavyliftingModel.find(
  {
    $and : 
    [
    {$or: [
      {"elementID": formdata },
      {"_id":  formdata }
      ]}, 
      {
        "active": true 
      }
      ]
    })
  query.exec(function (err, docs1) {
    if (err) { return next(err); }
    query1.exec(function (err, docs2) {
      if (err) { return next(err); }
      var temp = docs2[0] 
      if (docs2.length ==0) {
        temp=''
      }
      res.send({
        formdata : docs1[0] , 
        idItem : temp
      });
    })
  })
}