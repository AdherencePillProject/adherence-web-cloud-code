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

Parse.Cloud.define('setUserRole', function(req, response) {
	if(!req.params.accountType) {
		response.error('Account type has not been provided');
	}
	var accountType = req.params.accountType;
	var user = req.user;

	var queryRole = new Parse.Query(Parse.Role);
	queryRole.equalTo('name', accountType);

	queryRole.first({
		success: function(role) {
			role.getUsers().add(user);
			role.save();
			response.success("Succeed to add role ");
		},
		error: function(error) {
			response.error('Failed to set role - ' + accountType + 'for user - ' + req.params.username);
		}
	});
});