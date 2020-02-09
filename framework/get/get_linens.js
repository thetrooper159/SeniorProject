//Lance dummy data file for the linen table
//reference taken from file get_faq.js and linens table found in mysql

//sql credentials
var mysql = require('mysql12');
var sql = require('../../settings.js');

//connection to database
const connection = mysql.createConnection(sql);
//1
function getIdlinen(callbacl){
  connection.query(
    'SELECT *FROM linen WHERE section_Id=idlinen',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
getIdlinen(function(status, results){
  exports.general = results;
});

//2
function getHouse(callbacl){
  connection.query(
    'SELECT *FROM linen WHERE section_Id=house',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
gethouse(function(status, results){
  exports.general = results;
});

//3
function getRoom(callbacl){
  connection.query(
    'SELECT *FROM linen WHERE section_Id=room',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
getRoom(function(status, results){
  exports.general = results;
});

//4
function getGuests(callbacl){
  connection.query(
    'SELECT *FROM linen WHERE section_Id=guests',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
getGuests(function(status, results){
  exports.general = results;
});

//5
function getTw(callbacl){
  connection.query(
    'SELECT *FROM linen WHERE section_Id=tw',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
getTw(function(status, results){
  exports.general = results;
});

//6
function getWc(callbacl){
  connection.query(
    'SELECT *FROM linen WHERE section_Id=wc',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
getWc(function(status, results){
  exports.general = results;
});

//7
function getBm(callbacl){
  connection.query(
    'SELECT *FROM linen WHERE section_Id=bm',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
getBm(function(status, results){
  exports.general = results;
});

//8
function getBb(callbacl){
  connection.query(
    'SELECT *FROM linen WHERE section_Id=bb',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
getBb(function(status, results){
  exports.general = results;
});

//9
function getSh(callbacl){
  connection.query(
    'SELECT *FROM linen WHERE section_Id=sh',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
getSh(function(status, results){
  exports.general = results;
});

//10
function getTwin(callbacl){
  connection.query(
    'SELECT *FROM linen WHERE section_Id=twin',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
getTwin(function(status, results){
  exports.general = results;
});

//11
function getQueen(callbacl){
  connection.query(
    'SELECT *FROM linen WHERE section_Id=queen',
    function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        callback("success", results);
      }
    }
  };
}
getQueen(function(status, results){
  exports.general = results;
});




