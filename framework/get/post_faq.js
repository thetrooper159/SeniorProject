var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);

<<<<<<< HEAD

exports.getAll = function(data){
=======
var id = req.body.Id;
var ques = req.body.ques;
var ans = req.body.ans;

var submit = {
		name: req.body.name,
		email: req.body.email,
		message: req.body.message
		}
			var conn = mysql.createConnection(credentials.connection);
			conn.query('INSERT INTO contact SET ?', submit, function(err, results, rows, fields) {
				if (err) {
					res.redirect(303, '/contact?error='+err);
				}else{
						res.redirect('/contacted');
					}
				})
			});

exports.postAll = function(data){
>>>>>>> origin/master
	connection.query(
		'SELECT * FROM faq_sections',
		function(err, headers, fields) {
			if(err){
				data({error: err});
			}else{
				connection.query(
					'SELECT * FROM faq WHERE section_Id=1',
					function(err, general, fields) {
						if(err){
							data({error: err});
						}else{
							connection.query(
							'SELECT * FROM faq WHERE section_Id=2',
								function(err, forfamilies, fields) {
									if(err){
										data({error: err});
									}else{
										connection.query(
											'SELECT * FROM faq WHERE section_Id=3',
											function(err, allhouses, fields) {
												if(err){
													data({error: err});
												}else{
													connection.query(
														'SELECT * FROM faq WHERE section_Id=4',
														function(err, transportation, fields) {
															if(err){
																data({error: err});
															}else{
																connection.query(
																	'SELECT * FROM faq WHERE section_Id=5',
																	function(err, neville, fields) {
																		if(err){
																			data({error: err});
																		}else{
																			//data({ 'headers' : headers, 'general' : general, 'families' : families, 'allhouses' :  allhouses, 'transportation' : transportation, 'neville' : neville});
																			connection.query(
																			'SELECT * FROM faq WHERE section_Id=6',
																				function(err, shadyside, fields) {
																					if(err){
																						data({error: err});
																					}else{
																						connection.query(
																							'SELECT * FROM faq WHERE section_Id=7',
																							function(err, universityplace, fields) {
																								if(err){
																									data({error: err});
																								}else{
																									data({ 'headers' : headers, 'general' : general, 'families' : forfamilies, 'allhouses' :  allhouses, 'transportation' : transportation, 'neville' : neville, 'shadyside' : shadyside, 'universityplace': universityplace});
																								}
																							}
																						);
																					}
																				}
																			);
																		}
																	}
																);
															}
														}
													);
												}
											}
										);
									}
								}
							);
						}
					}
				);
			}
		}
	);
};
	/*




	connection.query(
		'SELECT * FROM faq WHERE section_Id=7',
		function(err, results, fields) {
			if(err){
				data({error: err});
			}else{
				data({university : results});
			}
		}
	);

	 */
