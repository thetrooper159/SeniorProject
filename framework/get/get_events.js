var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);


exports.getEventData = function(Id, data){
    var sql_run = "SELECT * FROM Events WHERE Id=" + Id;
    console.log(sql_run);
    	connection.query(
    		sql_run,
    		function(err, headers, fields) {
    			if(err){
    				console.log(err);
    				data({ "status" : false, "message" : "Could Not Get Event Data", "content" : null  });
    			}else{
    				data({ "status" : true, "message" : "Event Found", "content" : headers  });
    			}
    		}
    	);
}
exports.getAllEvents = function(data){
    var sql_run = "SELECT * FROM Events";
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
