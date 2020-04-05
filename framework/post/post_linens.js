
var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);


exports.serve = function(Id, callback){

var sql_run = 'UPDATE linen SET isServed=1 WHERE idlinen=' + Id;
	connection.query(
		sql_run,
		function(err, headers, fields) {
			if(err){
				console.log(err);
				callback(false);
			}else{
				callback(true);
			}
		}
	);
}
