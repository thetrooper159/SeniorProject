var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);


exports.getEventData = function(Id, data){
    var sql_run = "SELECT Id, house_Id, title, content,  DATE_FORMAT(event_date, '%M %d %Y') as event_date  FROM Events WHERE Id=" + Id;
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

exports.getEventAlerts = function(Id, data){
    var sql_run = "SELECT Id, house_Id, event_Id, title, alert_text, created_uid, modified_uid, DATE_FORMAT(alert_date, '%M %d %Y')  as alert_date  FROM Alerts WHERE event_Id=?";
    connection.query(
        sql_run,
        [Id],
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


exports.getAllEvents = function(data){
    var sql_run = "SELECT Id, title,  DATE_FORMAT(event_date, '%M %d %Y') as event_date, DATE_FORMAT(last_modified, '%M %d %Y') as last_modified, modified_uid FROM Events";
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
