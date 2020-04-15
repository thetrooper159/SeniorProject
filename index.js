
/*****************
Controller For Family House
*****************/


//Required packages for project
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const fs = require('fs');
//var mysql = require('mysql');
var mysql = require('mysql2');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var validator = require('validator');

/*
	BMR: JUST A NOTE TO ALL.... We will not be using npm package sql for our queries... instead we will be using mysql2
	This is built on top of mysql and makes quering data a lot simpler.
	For more information visit: https://www.npmjs.com/package/mysql2
*/




/*Required Modules */
var GLOBALS = require('./global_settings.js');
var sql = require('./settings.js');
var GET_Faq = require('./framework/get/get_faq.js');
var POST_Faq = require('./framework/post/post_faq.js');
var GET_linen = require('./framework/get/get_linens.js');
var POST_linen = require('./framework/post/post_linens.js');
var POST_Event = require('./framework/post/post_event.js');
var GET_Events = require('./framework/get/get_events.js');
var GET_Alerts = require('./framework/get/get_alerts.js');
var GET_Analytics = require('./framework/get/get_analytics.js');
var DELETE_Events = require('./framework/post/delete_events.js');
var DELETE_Alerts = require('./framework/post/delete_alerts.js');

var DELETE_Faq = require('./framework/post/delete_faq.js');


/* Initializing App */
var app = express();


/* Adding locations for easier use within pages  */
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/framework'));


/* Initializing Cookie Parser */
app.use(cookieParser());


/* Setting up Session vars, will be evenutally moved to its own export */
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

/* Setting Up bodparser inside of app */
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.urlencoded());


/* Setting Up express-handlebars... A little different from handlebars will a few extra features that work well within express */
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



/* Specific to express-handlebars that features agressive caching, This is extremely effective and should be kept off while working on application  */
//app.enable('view cache');



/* Setting Up our global variables that can be used anywhere through the site. */
app.locals.nav = GLOBALS.nav_items();


/* Where we set the port for the app */
app.set('port', process.env.PORT || 3000);

function isAuthenticated(req, res, next) {
  if (req.session.username)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/login');
}

app.use(function(req, res, next){
  // all the stuff from the example
  if (req.session.username) {
    res.locals.username = req.session.username
  }
  next();
});

/**********************
Start of Routing Pages
***********************/

/* Home Page */
app.get('/', isAuthenticated, function(req, res) {
    GET_Analytics.getFaqTotals(function(data){
        res.render('home', {
            general_hits  : data['general_hits'],
            neville_hits  : data['neville_hits'],
            all_houses_hits  : data['all_houses_hits'],
            transportation_hits  : data['transportation_hits'],
            shadyside_hits  : data['shadyside_hits'],
            forfamilies_hits  : data['forfamilies_hits'],
            university_hits  : data['university_hits']
        });
    });

});


/*****************
Alerts Pages Routing
****************/
app.get('/alerts', isAuthenticated, function(req, res) {


    GET_Alerts.getAllAlerts(function(alerts){
      console.log(alerts)
        res.render('Alerts/alerts', {
            alerts  :  alerts['content']
        });

    });

});

app.get('/alerts/:Id', isAuthenticated, function(req, res) {
    var Id = req.params.Id;
    GET_Alerts.getAlertData(Id, function(data){
        console.log(data.content[0]);
        res.render('Alerts/alert-details', {
            alert : data.content[0],
        });
    })

});

app.post('/create_alert', (req, res) => {
    var name = req.body.name;

    POST_Alerts.createAlert(name, function(status, message, Id){
        if(status == false){
            res.redirect("alerts");
        }else{
            res.redirect("/alerts/" + Id);
        }
    })
});
app.post('/delete_alerts', function(req, res) {
    /* DELETE_Faq*/
    var Id = req.body.Id;
    DELETE_Alerts.delete_alerts(Id, function(status, message){
        if(status == true){
            res.json({ status: true, message: message });
		}else{
            res.json({ status: false, message: message });
        }
    });

});
/**********
End Alerts
**********/

/*****************
Event Pages Routing
****************/
app.get('/events', isAuthenticated, function(req, res) {
    GET_Events.getAllEvents(function(events){
        //console.log(events['content']);
        res.render('Events/events', {
            events  :  events['content']
        });

    });

});

app.get('/events/:Id', isAuthenticated, function(req, res) {
    var Id = req.params.Id;
    GET_Events.getEventData(Id, function(data){
        console.log(data.content[0]);
        res.render('Events/event-details', {
            event : data.content[0],
        });
    })

});
/**********
End Events
**********/

app.post('/create_event', (req, res) => {
    var name = req.body.name;

    POST_Event.createEvent(name, function(status, message, Id){
        if(status == false){
            res.redirect("events");
        }else{
            res.redirect("/events/" + Id);
        }
    })
});
app.post('/delete_events', function(req, res) {
    /* DELETE_Faq*/
    var Id = req.body.Id;
    DELETE_Events.delete_events(Id, function(status, message){
        if(status == true){
            res.json({ status: true, message: message });
		}else{
            res.json({ status: false, message: message });
        }
    });

});

/* Push Notifications Page */
app.get('/notifications', isAuthenticated, function(req, res) {
  res.render('notifications', {
  });
});

app.post('/sendpushnotification', (req, res) => {
  const event = req.body.notification_type;
  const alert = req.body.select_house;
  console.log(event);
  res.redirect('/notifications')
});



app.post('/serve_linen_request', (req, res) => {
	POST_linen.serve(req['body']['Id'], function(status){
		if(status == true){
			res.send(true);
		}else{
			res.send(false);
		}

	});

});


/* Linen Request  */
app.get('/linen', isAuthenticated, function(req, res) {
	GET_linen.get_requests(function(status, data){
		if(status == true){
			res.render('linen', {
				requests      :    data,

			});

		}else{
			res.redirect('/500');
		}
	});

	/*
  const connection = mysql.createConnection(sql);
  connection.query('SELECT l.*, a.Id, a.Name FROM linen as l, houses as a WHERE l.house = a.Id',
  //connection.query('SELECT familyhouse.linen.house, familyhouse.linen.room,familyhouse.linen.towels, familyhouse.linen.washcloths,familyhouse.linen.bathmats,familyhouse.linen.bluebag  FROM familyhouse.linen;',
  function(err, results, rows, fields){
	res.render('linen', {rows: results, reverse: !req.query.reverse});
  });
  */

});


app.get('/faq', isAuthenticated, function(req, res){
	GET_Faq.getAll(function(data){
			res.render('faq', {
				success           :    req.session.success,
				error             :    req.session.error,
				headers           :    data.headers,
				general           :    data.general,
				allhouses         :    data.allhouses,
				forfamilies       :    data.families,
				transportation    :    data.transportation,
				neville           :    data.neville,
				shadyside         :    data.shadyside,
				university        :    data.universityplace

  			});
		delete req.session.success;
		delete req.session.error;
	});

});


app.post('/save_faq', function(req, res) {
	var questions = req.body.question;
	var answers =  req.body.answer;
	var Ids  = req.body.Id;

	var combo = {};
	for(var i=0; i < answers.length; i++){
		combo[i + 1] = [Ids[i], questions[i], answers[i]];
	}


	var post = POST_Faq.save_faq(combo, function(status, message){
		if(status == true){
			req.session.success = message;
			res.redirect('/faq');

		}else{
			req.session.error = message;
		}
	});

});

app.post('/delete_faq', function(req, res) {
    /* DELETE_Faq*/
    var Id = req.body.Id;
    DELETE_Faq.delete_faq(Id, function(status, message){
        if(status == true){
            res.json({ status: true, message: message });
		}else{
            res.json({ status: false, message: message });
        }
    });

});
app.post('/delete_event', function(req, res) {
    /* DELETE_Event*/
    var Id = req.body.Id;
    DELETE_Event.delete_event(Id, function(status, message){
        if(status == true){
            res.json({ status: true, message: message });
		}else{
            res.json({ status: false, message: message });
        }
    });

});

// Lance post code for linens
app.post('/api/v1/linens_request', function(req, res) {
  // add record to database with linens request
  function insertLinen(linen, callback) {
    const connection = mysql.createConnection(sql);
    connection.query('INSERT INTO linen (house, room, guests, towels, washcloths, bathmats, bluebag, date, twinsheets, queensheets, pillowcases, isServed, phoneID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [linen.house, linen.room, linen.guests, linen.towels, linen.washcloths, linen.bathmats, linen.bluebag, linen.date, linen.twinsheets, linen.queensheets, linen.pillowcases, linen.isServed, linen.phoneID],
    function (err, headers, fields) {
      if (err){
        console.log(err);
        callback(err);
      } else {
        callback();
      }
    });
  }

  insertLinen({
    house: req.body.house,
    room: req.body.room,
    guests: req.body.guests,
    towels: req.body.towels,
    washcloths: req.body.washcloths,
    bathmats: req.body.bathmats,
    bluebag: req.body.bluebag,
    date: req.body.date,
    twinsheets: req.body.twinsheets,
    queemsheets: req.body.queensheets,
    pillowcases: req.body.pillowcases,
    isServed: req.body.isServed,
    phoneID: req.body.phoneID
  }, function (err) {
    if (err){
      res.status(500);
      res.render('500');
    } else {
      console.log("done");
      res.status(200);
      res.send('ok');
    }


  });
});
//Lance and Voortman code
app.get('/api/v1/faq', function(req, res) {
  var mysql = require('mysql2');
  var sql = require('./settings.js');
  const connection = mysql.createConnection(sql);
  connection.query('SELECT * FROM faq, faq_sections WHERE faq.section_Id = faq_sections.Id',
    function(err, data, fields) {
      if (err) {
        console.log(err);
        res.status(500);
        res.render('500');
      }
      else {
        var result = [];
        var sections = {

        };
        for (var i = 0; i < data.length; i++) {

            if (!sections[data[i].section_Id]) {
              sections[data[i].section_Id] = {
                name: data[i].title,
                items: []
              }
            };
            sections[data[i].section_Id].items.push({
              id: data[i].Id,
              question: data[i].question,
              answer: data[i].answer,
              //order:  data[i].Order,
              //code: data[i].code,
            });
          //}
        }
        console.log(sections);
        for (var key in sections) {
          result.push(sections[key]);
        }
        res.send(result);
      }
    });
});


app.post('/create_notification', function(req, res) {
  var message = req.body.message;
  console.log("Message is: " + message);
  res.redirect("/thank-you");
});

app.get('/login', function(req, res) {
  res.render('login', {
  });
});

app.get('/register', function(req, res) {
  res.render('register', {
  });
});

app.get('/changepassword', function(req, res) {
  res.render('changepassword', {
  });
});

app.post('/regi', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
  }
    var conn = mysql.createConnection(sql);
    conn.query('INSERT INTO users SET ?', user, function(err, results, rows, fields) {
      if (err) {
        res.locals.message = "There seems to be an error.";
        res.redirect(303, '/register?error='+err);
      } else if (username && password) {
      		conn.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, results, rows, fields) {
      			if (results.length > 0) {
      				req.session.loggedin = true;
      				req.session.username = username;
              req.session.user_ID = results[0].ID;
              console.log(req.session.user_ID);
      				res.redirect(303, '/');
      			} else {
              res.locals.message = "There seems to be an error.";
      				res.redirect(303, '/login?error='+err);
      			}
      			res.end();
      		});
      	} else {
          res.locals.message = "There seems to be an error.";
          res.redirect(303, '/login?error='+err);
      		res.end();
      	}
    });
  });

app.post('/auth', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
    var conn = mysql.createConnection(sql);
		conn.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, results, rows, fields) {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        req.session.user_ID = results[0].ID;
        console.log(req.session.user_ID);
        res.redirect(303,'/');
      } else {
        res.locals.message = "There seems to be an error.";
        res.redirect(303, '/login?error='+err);
      }
			res.end();
		});
	} else {
    res.locals.message = "There seems to be an error.";
    res.redirect(303, '/login?error='+err);
		res.end();
	}
});

app.get('/logout', function(req, res){
        delete req.session.username;
        res.redirect(303, '/');
});
//*******KEEP ALL ROUTES ABOVE THIS ******************//

/* 404 Error Page */
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

/* 500 Error Page */
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.status(500);
  res.render('500');
});


/**********************
Stop of Routing Pages
***********************/

/* Start Server */
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
