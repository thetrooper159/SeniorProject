var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);


exports.getAll = function(data){
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
