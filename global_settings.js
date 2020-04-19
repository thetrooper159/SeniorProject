/***************************

GLOBAL VARIABLES FOR FAMILY HOUSE ADMIN BACKEND

***************************/



/* Nav Bar Items, Insert here in this format to Add to navigation */
exports.nav_items = function(){
  var nav = [
	{name: "Home", link: "/"},
	/* {name: "Send Notifications", link: "/notifications"}, */
	{name: "Linen Requests", link: "/linen"},
	{name: "F.A.Q.", link: "/faq"},
  {name: "Events", link: "/events"},
  {name: "Alerts", link: "/alerts"},
    {name: "Analytics", link: "/analytics"},



  ]
 return nav;
}
