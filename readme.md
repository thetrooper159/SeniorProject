<center><h1>Family House Documentation</h1></center>



<section>
<h2>About</h2>
<p>Family House has services that help support families and the environment around them.  There are volunteer opportunities that ensure the highest level of safety and security for our families.  These volunteer-organized activities include pantry items, meals and other activities.  They provide opportunities on a community based level through affordable housing.  Family House offers these accommodations to limit the financial burden on people with medical problems.  They offer a place for people to heal and to connect with loved ones.  In addition to providing residential services, there is also support from corporations, foundations and individuals themselves.  Family House is a healthcare hospitality network located in Neville, Shadyside and University Place.</p>
</section>

<hr>

<section>
<h2>Data Analytics</h2>
<p>The goal is to keep track of the number of times a user clicks on a question within the F.A.Q page. The index.js file contains code that keeps track of this data.  Under app.get('/', isAuthenticated, function(req, res) { GET_Analytics.getFaqTotals(function(data){   res.render('home', { general_hits  : data['general_hits'], neville_hits  : data['neville_hits'], all_houses_hits  :  data['all_houses_hits'], transportation_hits  : data['transportation_hits'], shadyside_hits  : data['shadyside_hits'], forfamilies_hits  : data['forfamilies_hits'],   university_hits  : data['university_hits'].  Here General Hits is 16, Neville Hits is 11, All Houses Hits is 17, Transportation Hits is 1, Shadyside Hits is 10, For Families Hits is 20 and University Place Hits is 10. In home.handlebars, the data is placed into a list, which is then templated and able to be displayed on the webpage.  In home.handlebars a list of data points is shown.  The user is able to click on the specified datapoint and the chart will get updated.  The chart is able to do this because Chart.min.js is downloaded in the server and is referenced in home.handlebars.  In home.handlebars script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js">/script references Chart.min.js.  The chart is being drawn to the webpage in home.handlebars through let barChart = new Chart(myChart, { type:'pie', data:{ labels:["General" , "Neville" , "All Houses" , 'Transportation' , 'Shadyside' , 'For Families' , 'University Place'].  Now the chart is visible for users. <li><b>General Hits</b>: {{ general_hits }}</li> <li><b>Neville Hits</b>: {{ neville_hits }}</li> <li><b>All Houses Hits</b>: {{ all_houses_hits }}</li> 	<li><b>Transportation Hits</b>: {{ transportation_hits }}</li> <li><b>Shadyside Hits</b>: {{ shadyside_hits }}</li> <li><b>For Families Hits</b>: {{ forfamilies_hits }}</li> <li><b>University Place Hits</b>: {{ university_hits }}</li>  </p>
<center><img src="dataanalytics.png" alt="dataanalytics" width="500" height="500" border="3"></center>
</section>

<hr>

<section>
<h2>Function of Main Layout</h2>
<p>The main layout has a navigation bar that shows up on every page.  In the main.handlebars file the nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #565A5C;" displays the navigation bar.  The navigation bar contains links which include Home, Linen Requests, F.A.Q, Events and Send Alerts.  The Home link is being routed to app.get('/home') in the index.js file.  The Linen Requests link is being routed to the app.get('/linen') in the index.js file.  The F.A.Q link is being routed to app.get('/faq') in the index.js file.  The Events link is being routed to the app.get('/events') in the index.js file.  The Send Alerts link is being routed to the app.get('/alerts') in the index.js file.  On the navigation bar, there is also a facebook icon that directs the user to the Family House facebook page.  The main.handlebars file contains src="/images/facebook_icon.png" style="width: 58px; height: 58px;".  This displays the facebook icon and now the user can click on it and they will be directed to the Family House facebook page. Above the Facebook icon is the logout button.  In index.js there is a route for the logout button.  app.get('/logout', function(req, res){ delete req.session.username;   res.redirect(303, '/');  When the user clicks on the logout button they will be redirected to the login page.  The login page allows the user to use his or her username and password to login to the website. The index.js file includes code that contains information about the username and password logins.  app.post('/auth', function(req, res) { var username = req.body.username; var password = req.body.password;  Then there is a query to the database.  conn.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, results, rows, fields) { if (results.length > 0) { req.session.loggedin = true; req.session.username = username; req.session.user_ID = results[0].ID; console.log(req.session.user_ID);   res.redirect(303,'/');  This queries the database and allows the user to login to the page.     </p>
</section>

<hr>

<section>
<h2>Function of Webpages</h2>



<ul>
<li>Home</li>
<li>Linen Requests</li>
<li>F.A.Q</li>
<li>Events</li>
<li>Send Alerts</li>
</ul>

</section>

<hr>

<section>
<h2>Home</h2>
<p>The homepage is an interface where the user can view the different sections and can navigate to the other pages with buttons.  When the user clicks on the Create an Event button in the Create Event section, they will be routed to the events page.  In the home.handlebars file, the a href="/Events" is calling the route from the app.get('/events') located in the index.js file.  When the user clicks on the Create an Alert button under the Create Alert section, they will be routed to the alert page.  In the home.handlebars file, a href="/alerts" is calling the route from app.get('/alerts') located in the index.js file. When the user clicks on the go to requests button under the Linen Requests section, they will be routed to the linen requests page.  In the home.handlebars file, a href="/linen" is calling the route from app.get('/linen') in the index.js file.  When the user clicks on the edit F.A.Q button under the F.A.Q section, they will be routed to the faq page.  In the home.handlebars file, a href="/faq" is calling the route from app.get('/faq') located in the index.js file. </p>

</section>

<hr>

<section>
<h2>Linen Requests</h2>
<p>The linens request page contains a jquery datatable with rows and columns.  The information includes House Name, Quantity of Queen Sheets, Quantity of Twin Sheets, Room Number, Quantity of Towels, Quantity of Washcloths, Quantity of Bathmats, Quantity of Bluebags, Request Date and Served.  There is a dropdown box that allows the user to select the number of entries to be displayed on the page.  The entry options include 10, 25, 50 and 100.  There is a search box where the user can type in the house name.  When the user types in Neville, all of the data associated with Neville will display on the page.  When the user types in Shadyside, all the data associated with Shadyside will display on the page.  When the user types in University Place, all of the data associated with University Place will display on the page.  There is print table button that allows the user to print the jquery datatable.  In linen.handlebars, the button id="print_button" displays the button on the webpage.  The print table button has an event listener and when the user clicks the button the table will display and a print window will show.  The function printData(){ var divToPrint=document.getElementById("Linen_Requests_unserved") allows the print button window to appear.  The user can then, select the printer options.  There is a complete button inside the served column.  Inside the linen.handlebars file, the button class="btn btn-primary serve_request" id="" rel="{{ idlinen }}">Complete shows the complete button.  For the marking off the data that has already been served, $('.serve_request').on("click", function(){var Id = $(this).attr("rel"); $.ajax({type: 'post',url: '/serve_linen_request'}) in the linen.handlebars file creates a function and uses an ajax call for /serve_linen_request.  Var Id = $(this).attr("rel"); binds the variable Id to an attribute.  The ajax call recognizes this attribute and pinpoints to the /serve_linen_request.  At the bottom of the linen request page, there is text that shows the number of entries available and the number that is currently displaying on the page.  The entry number updates when a user is viewing a different entry.  </p>
<center><img src="linenstable.png" alt="linenstable" width="1000" height="666" border="3"></center>
</section>

<hr>
<section>
<h2>F.A.Q</h2>
<p>The F.A.Q page has a navigation bar that includes General, All Houses, For Families, Transportation, Neville, Shadyside and University Place.  At the end of the navigation bar there is a save button.  The save button allows the user to save their work before leaving the page.  The button class="btn btn-success" type="submit" value="submit" style="margin-top: 5px;"Save in the faq.handlebars file creates the saved button and gives it the value of submit.  When the user clicks the save button, a notification will show on the screen that the page is updated.  In faq.handlebars, the div class="alert alert-primary" role="alert" set up the alert and the span aria-hidden="true"times; gives the border around the alert upon click of the button.  There is also a delete button for modals.  The faq.handlebars file contains a class="btn btn-primary" id="deletebtn2" style="float: right; margin-bottom: 50px; color: white;" data-toggle="modal" data-target="#deleteModal_{{ Id }}"Delete which sets up the delete button.  The div class="modal fade" id="deleteModal_{{ Id }}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" sets up the functionality by templating the Id.  This allows the user able to delete the text area boxes located in General, All Houses, For Families, Transportation, Neville, Shadyside and University Place.  When the user clicks the delete button, an alert will show at the top of the page letting the user know that the section has been deleted.  This is achieved through button type="button" class="close" data-dismiss="alert" aria-label="Close" in faq.handlebars.  The data-dismiss="alert" is applied the alert to the button.  The aria-label="Close" puts the border around the alert making it simple for the user to read when they are notified about the section being deleted.  Under General, there is a small text box for the question on the left and the larger text area box for answers on the right. In faq.handlebars the {{#general}} column sets up the information displayed for the General tab.  The div class="form-row" id="section-{{ Id }}" sets up the form and templates the Id.  The input class="form-control" type="text" name="question[]" value="<b>{{ question }}</b>" templates the question for the form and the textarea class="form-control" name="answer[]"  style="margin-bottom: 10px; height: 200px;"<b>{{ answer }}</b> templates the answer for the form.</p>
</section>
<section>
  <p>Under All Houses, there is a small text box for the question on the left and the larger text area box for answers on the right.  In faq.handlebars the {{#allhouses}} column sets up the information displayed for the All Houses tab.  The div class="form-row" id="section-{{ Id }}" sets up the form and templates the Id.  The input class="form-control" type="text" name="question[]" value="<b>{{ question }}</b>" templates the question for the form and the textarea class="form-control" name="answer[]"  style="margin-bottom: 10px; height: 200px;"<b>{{ answer }}</b> templates the answer for the form.</p>
  <br>
  <br><center><img src="allhouses.png" alt="allhouses" width="600" height="250" border="3"></center>
</section>
<section>
   <br><p>Under For Families, there is a small text box for the question on the left and the larger text area box for answers on the right.  In faq.handlebars the {{#forfamilies}} column sets up the information displayed for the For Families tab.  The div class="form-row" id="section-{{ Id }}" sets up the form and templates the Id.  The input class="form-control" type="text" name="question[]" value="<b>{{ question }}</b>" templates the question for the form and the textarea class="form-control" name="answer[]"  style="margin-bottom: 10px; height: 200px;"<b>{{ answer }}</b> templates the answer for the form.</p>  
   <br>
   <br><center><img src="forfamilies.png" alt="forfamilies" width="600" height="250" border="3"></center>
</section>
<section>
<br>
    <br><p>Under Transportation, there is a small text box for the question on the left and the larger text area box for answers on the right.  In faq.handlebars the {{#transportation}} column sets up the information displayed for the Transportation tab.  The div class="form-row" id="section-{{ Id }}" sets up the form and templates the Id.  The input class="form-control" type="text" name="question[]" value="<b>{{ question }}</b>" templates the question for the form and the textarea class="form-control" name="answer[]"  style="margin-bottom: 10px; height: 200px;"<b>{{ answer }}</b> templates the answer for the form.</p>
    <br>
    <br><center><img src="transportation.png" alt="transportation" width="600" height="250" border="3"></center>
</section>
<section>
<br>
    <br><p>Under Neville, there is a small text box for the question on the left and the larger text area box for answers on the right.  In faq.handlebars the {{#neville}} column sets up the information displayed for the Neville tab.  The div class="form-row" id="section-{{ Id }}" sets up the form and templates the Id.  The input class="form-control" type="text" name="question[]" value="<b>{{ question }}</b>" templates the question for the form and the textarea class="form-control" name="answer[]"  style="margin-bottom: 10px; height: 200px;"<b>{{ answer }}</b> templates the answer for the form.</p>
    <br>
    <br><center><img src="neville.png" alt="neville" width="600" height="250" border="3"></center>
</section>
<section>
<br>
    <br><p>Under Shadyside, there is a small text box for the question on the left and the larger text area box for answers on the right.  In faq.handlebars the {{#shadyside}} column sets up the information displayed for the Shadyside tab.  The div class="form-row" id="section-{{ Id }}" sets up the form and templates the Id.  The input class="form-control" type="text" name="question[]" value="<b>{{ question }}</b>" templates the question for the form and the textarea class="form-control" name="answer[]"  style="margin-bottom: 10px; height: 200px;"<b>{{ answer }}</b> templates the answer for the form.</p>
    <br>
     <br><center><img src="shadyside.png" alt="shadyside" width="600" height="250" border="3"></center>
</section>
<section>
    <br><p>Under University Place, there is a small text box for the question on the left and the larger text area box for answers on the right.  In faq.handlebars the {{#university}} column sets up the information displayed for the University Place tab.  The div class="form-row" id="section-{{ Id }}" sets up the form and templates the Id.  The input class="form-control" type="text" name="question[]" value="<b>{{ question }}</b>" templates the question for the form and the textarea class="form-control" name="answer[]"  style="margin-bottom: 10px; height: 200px;"<b>{{ answer }}</b> templates the answer for the form. A section can have multiple questions and answers.  </p>
    <br>
    <br><center><img src="university.png" alt="university" width="600" height="250" border="3"></center>
</section>

<hr>
<section>
<h2>Events</h2>
<p>The events page allows users to create events by typing in the event title and date that the event will take place.  The events.handlebars file includes the a class="btn btn-success" style="float: right; margin-bottom: 50px color: white;" data-toggle="modal" data-target="#createEvent" Create Event.  This code displays the Create Event button and sets up a window where the user can type in the event title, event date, the house associated with the event and upload an image about the event.  The events page has a jquery datatable that includes the Event Name, Event Date, Created, Modified, Edit and Delete.  The Edit Column allows the user to modify an event and save the changes.  Once the changes are saved, the page gets updated with the latest information.  The delete button allows users to delete events.  At the top of the table there is a search box where the user can look up an event.  At the bottom of the events page there is text that shows the number of entries available and the current entry being displayed on the page.  The text gets updated when the user navigates to another entry.  At the top of the table is a dropdown menu where the user can decide how many entries they want to go through.  The options in the dropdown menu are 10,25,50 and 100.  When creating the event, there is placeholder text where information about the event can be placed.  Information about these events are then stored in the MySQL Database on the backend.</p>
<center><img src="events.png" alt="eventstable" width="1000" height="500" border="3"></center>
</section>

<hr>

<section>
<h2>Send Alerts</h2>
<p>The send alerts page has a jquery datatable that contains the Events Name, Event Date, Created, Modified, Edit and Delete.  These events in the alerts table will be sent out and the user will recieve an alert once an event gets created.  The send alerts page has a dropdown menu where the user can select which house the alert will go to.  You can send alerts to Neville, Shadyside, University Place and All Houses.  The div class="form-group" sets up the form in alerts.handlebars and the select name="select_house" class="form-control" sets up the viewable options to choose all houses, Neville, Shadyside or University Place.  There is also a date field below the choose a house dropdown menu.  The date lets you choose the month, day and year that the alert will get sent out.  Under the div class="form-group" there is a label for="message">Date label.  This label makes the options available for deciding on the month, day and year that the alert or alerts will go out.  Below the date is a text area box where the description of the alert is placed before it gets sent. The textarea id="message" name="message" placeholder="Write something.." class="form-control" style="width: 100%; height: 250px" in alerts.handlebars implements the text box for the description of the alert to be placed.  The submit button on the alerts page is below the text area box and when it is pressed, an alert will show at the top of the page letting the user know that the alert has been sent.  </p>
<center><img src="alerts.png" alt="alertstable" width="1000" height="300" border="3"></center>
</section>
<br><br><br>
