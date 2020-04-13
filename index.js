
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

console.log(app.locals.nav);
/* Where we set the port for the app */
app.set('port', process.env.PORT || 3001);



/**********************
Start of Routing Pages
***********************/

/* Home Page */
app.get('/home', isAuthenticated, function(req, res) {
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
        res.render('Alerts/alerts', {
            alerts  :  alerts['content']
        });

    });

});

app.get('/alerts/:Id', isAuthenticated, function(req, res) {
    var Id = req.params.Id;
    GET_Alerts.getAlertData(Id, function(data){
        console.log(data.content[0]);
        res.render('Alert/alert-details', {
            alert : data.content[0],
        });
    })

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
app.get('/notifications', function(req, res) {
  res.render('notifications', {
  });
});

app.post('/sendpushnotification', (req, res) => {
  const event = req.body.notification_type;
  const alert = req.body.select_house;
  console.log(event);
  res.redirect('/notifications')
});

/* Linen Request  */
app.get('/linen', function(req, res) {

    const connection = mysql.createConnection(sql);

  connection.query('SELECT l.*, a.Id, a.Name FROM linen as l, houses as a WHERE l.house = a.Id')
  connection.query('SELECT familyhouse.linen.house, familyhouse.linen.room,familyhouse.linen.towels, familyhouse.linen.washcloths,familyhouse.linen.bathmats,familyhouse.linen.bluebag  FROM familyhouse.linen;',

   function(err, results, rows, fields){
    console.log(results);

    var sortby = req.query.sortby;
    // sort results based on query parameter
    if (!sortby) {
      sortby = "isServed";
    }
    results.sort(function(x, y) {
      if(!req.query.reverse) {
      if (typeof x[sortby] === "string") {
        return x[sortby].localeCompare(y[sortby]);
      }
      else {
        return x[sortby] - y[sortby];
      }
      }
      else{
      if (typeof x[sortby] === "string") {
        return y[sortby].localeCompare(x[sortby]);
      }
      else {
        return y[sortby] - x[sortby];
      }
    }
    });

    res.render('linen', {rows: results, reverse: !req.query.reverse});
  });
});

app.get('/faq', function(req, res) {
	GET_Faq.getAll(function(data){
		if(data.error){
			res.redirect('/500');
		}else{
			res.render('faq', {
				headers           :    data.headers,
				general           :    data.general,
				allhouses         :    data.allhouses,
				forfamilies       :    data.families,
				transportation    :    data.transportation,
				neville           :    data.neville,
				shadyside         :    data.shadyside,
				universityplace   :    data.universityplace
  			});
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
        for (var i = 0; i < data.length; i++) {
          console.log(data[i]);
        }
        //console.log(data);
        res.send([{
          name: "General",
          items: [{
            id: 13,
            question: "Question ...",
            answer: "Answer ...",
          }, {
            id: 14,
            question: "Question ...",
            answer: "Answer ...",
          }]
        }, {
          name: "For Families",
          items: [{
            id: 15,
            question: "Question ...",
            answer: "Answer ...",
          }, {
            id: 16,
            question: "Question ...",
            answer: "Answer ...",
          }]
        }]);
      }
    });
});

app.post('/api/v1/linens_request', function(req, res) {
  // add record to database with linens request
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
