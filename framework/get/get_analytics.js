var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);


exports.getFaqTotals = function(data){
     countGeneral(function(general_hits){
         countNeville(function(neville_hits){
             countAllHouses(function(all_houses_hits){
                 countTransportation(function(transportation_hits){
                    countShadyside(function(shadyside_hits){
                        countForFamilies(function(forfamilies_hits){
                            countUniversityPlace(function(university_hits){
                                data({"general_hits" : general_hits, "neville_hits" : neville_hits, "all_houses_hits" : all_houses_hits, "transportation_hits" : transportation_hits, "shadyside_hits" : shadyside_hits, "forfamilies_hits" : forfamilies_hits, "university_hits" : university_hits})
                            });
                        });
                    });
                });
            });
        });
    });



}


function countGeneral(num){
    var sql_run = "SELECT count(value) FROM analytics WHERE event='faq_page_hit' AND content='general'"
    connection.query(
        sql_run,
        function(err, headers, fields) {
            //console.log(headers[0]['count(value)']);
            if(err){
                num(0);

            }else{
                num(headers[0]['count(value)']);
            }
        }
    );
}
function countNeville(num){
    var sql_run = "SELECT count(value) FROM analytics WHERE event='faq_page_hit' AND content='neville'"
    connection.query(
        sql_run,
        function(err, headers, fields) {
            //console.log(headers[0]['count(value)']);
            if(err){
                num(0);

            }else{
                num(headers[0]['count(value)']);
            }
        }
    );
}
function countAllHouses(num){
    var sql_run = "SELECT count(value) FROM analytics WHERE event='faq_page_hit' AND content='all_houses'"
    connection.query(
        sql_run,
        function(err, headers, fields) {
            //console.log(headers[0]['count(value)']);
            if(err){
                num(0);

            }else{
                num(headers[0]['count(value)']);
            }
        }
    );
}
function countTransportation(num){
    var sql_run = "SELECT count(value) FROM analytics WHERE event='faq_page_hit' AND content='transportation'"
    connection.query(
        sql_run,
        function(err, headers, fields) {
            //console.log(headers[0]['count(value)']);
            if(err){
                num(0);

            }else{
                num(headers[0]['count(value)']);
            }
        }
    );
}
function countShadyside(num){
    var sql_run = "SELECT count(value) FROM analytics WHERE event='faq_page_hit' AND content='shadyside'"
    connection.query(
        sql_run,
        function(err, headers, fields) {
            //console.log(headers[0]['count(value)']);
            if(err){
                num(0);

            }else{
                num(headers[0]['count(value)']);
            }
        }
    );
}
function countForFamilies(num){
    var sql_run = "SELECT count(value) FROM analytics WHERE event='faq_page_hit' AND content='for_families'"
    connection.query(
        sql_run,
        function(err, headers, fields) {
            //console.log(headers[0]['count(value)']);
            if(err){
                num(0);

            }else{
                num(headers[0]['count(value)']);
            }
        }
    );
}

function countUniversityPlace(num){
    var sql_run = "SELECT count(value) FROM analytics WHERE event='faq_page_hit' AND content='universityplace'"
    connection.query(
        sql_run,
        function(err, headers, fields) {
            //console.log(headers[0]['count(value)']);
            if(err){
                num(0);

            }else{
                num(headers[0]['count(value)']);
            }
        }
    );
}
