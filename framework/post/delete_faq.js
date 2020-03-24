
var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);

exports.delete_faq = function(combo, callback){
console.log(Ids);

var sql_run = "DELETE FROM faq WHERE Id="+Ids+"";
	connection.query(
		sql_run,
		function(err, headers, fields) {
			if(err){

				console.log(err);
				callback(false);
			}else{
				console.log("DELETE FROM faq WHERE Id="+Ids+"");
				callback(true, "This line has been deleted!");
			}
		}
	);
}
