// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
	response.success("Hello world!");
});

Parse.Cloud.define("loggedInUser", function(request, response) {
	var currentUser = Parse.User.current();
	if (currentUser) {
		response.success(currentUser);
	} else {
		response.error("No user found, please login");
	}
});