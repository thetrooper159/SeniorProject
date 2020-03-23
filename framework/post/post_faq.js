
var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);

exports.save_faq = function(combo, callback){
	var combo_length = 0;
	for(var x in combo){
		combo_length ++
	}
	for(var i = 1; i <= combo_length; i++){
		var sql_run = 'UPDATE faq SET answer="' + combo[i][2] +  '" , question="' + combo[i][1] +  '" WHERE Id=' + combo[i][0];
		//console.log(combo[i][0]);
		connection.query(
			sql_run,
			function(err, headers, fields) {
				if(err){
					console.log(err);
					callback(false, "There was an error saving the page, please try again!");

				}else{
				}
			}
		);
	}
callback(true, "Page Updated!");
	//console.log(query);
}

exports.delete_faq = function(Id, callback){

var sql_run = "DELETE FROM faq WHERE Id="+Id+"";
	connection.query(
		sql_run,
		function(err, headers, fields) {
			if(err){
				console.log(err);
				callback(false);
			}else{
				console.log("DELETE FROM faq WHERE Id="+Id+"");
				callback(true, "This line has been deleted!");
			}
		}
	);
}
