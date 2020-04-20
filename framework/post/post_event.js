var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);


exports.save_details = function(name, content, house, Id, user, callback){
    console.log(Id);
    //Getting Data to format our date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    }
    if(mm<10)
    {
        mm='0'+mm;
    }
    //Setting date to the date format required fopr sql
    today = yyyy+'-'+mm+'-'+dd;

    var sql_run = "UPDATE Events SET house_Id=?, title=?, content=?, last_modified=?, modified_uid=? WHERE Id=?";
    connection.query(
		sql_run,
        [house, name, content, today, user, Id],
		function(err, headers, fields) {
			if(err){
				console.log(err);
				callback(false, "Could not Create Event... Please try again!");
			}else{
				callback(true, "Event Saved");
			}
		}
	);

}

exports.createEvent = function(name, date, user, callback){

    //Getting Data to format our date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    }
    if(mm<10)
    {
        mm='0'+mm;
    }
    //Setting date to the date format required fopr sql
    today = yyyy+'-'+mm+'-'+dd;


var sql_run = "INSERT INTO Events (`title`, `event_date`, `created`, `last_modified`, `created_uid`, `modified_uid`) VALUES(?,?,?,?,?,?)";
	connection.query(
		sql_run,
        [name, date, today, today, user, user],
		function(err, headers, fields) {
			if(err){
				console.log(err);
				callback(false, "Could not Create Event... Please try again!");
			}else{
				callback(true, "Event Created", headers.insertId);
			}
		}
	);

}
