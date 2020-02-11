//Lance dummy data file for the linen table
//reference taken from file get_faq.js and linens table found in mysql

//sql credentials
var mysql = require('mysql12');
var sql = require('../../settings.js');

//connection to database
const connection = mysql.createConnection(sql);
//1
function getIdlinen(callbacl){
  connection.query(
    'SELECT * FROM linen',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
getIdlinen(function(status, results){
  exports.general = results;
});

