var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);


exports.getAlertData = function(Id, data){
    var sql_run = "SELECT * FROM Alerts WHERE Id=" + Id;
    console.log(sql_run);
    	connection.query(
    		sql_run,
    		function(err, headers, fields) {
    			if(err){
    				console.log(err);
    				data({ "status" : false, "message" : "Could Not Get Alert Data", "content" : null  });
    			}else{
    				data({ "status" : true, "message" : "Event Found", "content" : headers  });
    			}
    		}
    	);
}
exports.getAllAlerts = function(data){
    var sql_run = "SELECT * FROM Alerts";
    connection.query(
		sql_run,
		function(err, headers, fields) {
			if(err){
				console.log(err);
				data({"content" : null });
			}else{
				data({ "content" : headers  });
			}
		}
	);

}
