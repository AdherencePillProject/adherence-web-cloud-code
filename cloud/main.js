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
		response.error('Account type is not provided');
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

Parse.Cloud.define('setPatient', function(req, response) {
	if(!req.params.username) {
		response.error('UserId is not provided ' + req.params.username);
	}
	Parse.Cloud.useMasterKey();
	var username = req.params.username;
	var query = new Parse.Query(Parse.User);
	query.equalTo("username", username);  // find all the women
	query.first({
  		success: function(user) {
  			var newPatient = new Parse.Object("Patient");
			// user.set("userType", ["Patient"]);
			// user.save();
			newPatient.set("userAccount", user);
			newPatient.save(null, {
				success: function(newPatient){
					response.success("The patient is saved successfully");
				},
				error: function(error){
					response.error("Failed to save patient with error code: " + error.code + " " + error.message + " user: " + user);
				}
			});
  			response.success("Find user with username " + username);
  		},
  		error: function(error) {
	  		response.error('Failed to find user with username ' + username);
		}
	});
});

Parse.Cloud.define('setDoctor', function(req, response) {
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

Parse.Cloud.define('setPharmacy', function(req, response) {
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