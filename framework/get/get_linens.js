//Lance dummy data file for the linen table
//reference taken from file get_faq.js and linens table found in mysql

//sql credentials
var mysql = require('mysql2');
var sql = require('../../settings.js');

//connection to database
const connection = mysql.createConnection(sql);


exports.get_requests = function(callback){
	connection.query( 
		'SELECT l.*, a.Id, a.Name FROM linen as l, houses as a WHERE l.house = a.Id',
		function(err, headers, fields) {
			if(err){
				console.log(err);
				callback(false, null);
			
			}else{
				callback(true, headers);
				//console.log(true, headers);
			}
		}
	);
}