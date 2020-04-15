var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);

exports.delete_alert = function(Id, callback){


var sql_run = "DELETE FROM Alert WHERE Id="+ Id +"";
	connection.query(
		sql_run,
		function(err, headers, fields) {
			if(err){
				console.log(err);
				callback(false, "Section could not be deleted, Please try again !");
			}else{
				callback(true, "This Section has been deleted!");
			}
		}
	);

}
