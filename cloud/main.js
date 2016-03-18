// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
	response.success("Hello world!");
});

Parse.Cloud.define('saveUserWithNewPointer', function(request, response) {
	Parse.Cloud.useMasterKey();
	var id = request.params.user;
	var newRole = request.params.newRole;
	var p = request.params.pointer;
	var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", id);
    query.first({ 
		success: function (user) {
			var obj = Parse.Object.extend(newRole);
			var query2 = new Parse.Query(obj);
    		query2.equalTo("objectId", p);
    		query2.first({
    			success: function (pntr) {
    				if (newRole == "Doctor")
    					user.set("doctorPointer", pntr);
    				else 
    					user.set("patientPointer", pntr);
					user.save(null, {
						success: function (user) {
							response.success("Updated the user successfully");
						},
						error: function (error) {
							response.error("Failed to s@ve new user");
						}
					});
				},
				error: function (err) {
					response.error("Failed to find the pointer");
				}
			});
    	},
    	error: function (err) {
    		response.error("Failed to find the original user");
    	}

    });
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
			response.success("Succeeded to set role ");
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
	query.equalTo("username", username);
	query.first({
  		success: function(user) {
  			var newPatient = new Parse.Object("Patient");
			// user.set("userType", ["Patient"]);
			// user.save();
			newPatient.set("userAccount", user);
			newPatient.save(null, {
				success: function(newPatient) {
					user.set("patientPointer", newPatient);
					user.save(null, {
						success: function (user) {
							response.success("Saved a patient reference in the user class");
						},
						error: function (error) {
							response.error("Failed to save a patient reference in the user class")
						}
					})

				},
				error: function(error){
					response.error("Failed to save patient with error code: " + error.code + " " + error.message + " user: " + username);
				}
			})
  		},
  		error: function(error) {
	  		response.error('Failed to find user with username ' + username);
		}
	});
});

Parse.Cloud.define('setDoctor', function(req, response) {
	if(!req.params.username) {
		response.error('UserId is not provided ' + req.params.username);
	}
	Parse.Cloud.useMasterKey();
	var username = req.params.username;
	var query = new Parse.Query(Parse.User);
	query.equalTo("username", username);
	query.first({
  		success: function(user) {
  			var newPatient = new Parse.Object("Doctor");
			// user.set("userType", ["Patient"]);
			// user.save();
			newPatient.set("userAccount", user);
			newPatient.save(null, {
				success: function(newDoctor){

					user.set("doctorPointer", newDoctor);
					user.save(null, {
						success: function (user) {
							response.success("Saved a doctor reference in the user class");
						},
						error: function (error) {
							response.error("Failed to save a doctor reference in the user class")
						}
					})
				},
				error: function(error){
					response.error("Failed to save doctor with error code: " + error.code + " " + error.message + " user: " + username);
				}
			});
  		},
  		error: function(error) {
	  		response.error('Failed to find user with username ' + username);
		}
	});
});

Parse.Cloud.define('setPharmacy', function(req, response) {
	if(!req.params.username) {
		response.error('UserId is not provided ' + req.params.username);
	}
	Parse.Cloud.useMasterKey();
	var username = req.params.username;
	var query = new Parse.Query(Parse.User);
	query.equalTo("username", username);
	query.first({
  		success: function(user) {
  			var newPatient = new Parse.Object("Pharmacy");
			// user.set("userType", ["Patient"]);
			// user.save();
			newPatient.set("userAccount", user);
			newPatient.save(null, {
				success: function(newPatient){
					response.success("The Pharmacy is saved successfully");
				},
				error: function(error){
					response.error("Failed to save Pharmacy with error code: " + error.code + " " + error.message + " user: " + username);
				}
			});
  			response.success("Find user with username " + username);
  		},
  		error: function(error) {
	  		response.error('Failed to find user with username ' + username);
		}
	});
});

Parse.Cloud.define("getCurrentScoreForPill", function(req, response) {
	// TODO
});


// This is a master function for search
// searchClass - the class to search against
// searchCriteria - the column to search against
// searchValue - value to search for
// The function will return the object that you are searching for
Parse.Cloud.define("search", function(req, response) {
	if(!req.params.searchClass){
		response.error("Please make sure 'searchClass' is set in the request.");
	}
	if(!req.params.searchCriteria){
		response.error("Please make sure 'searchCriteria' is set in the request.");
	}
	if(!req.params.searchValue){
		response.error("Please make sure 'searchValue' is set in the request.");
	}
	Parse.Cloud.useMasterKey();

	searchClass = req.params.searchClass;
	searchCriteria = req.params.searchCriteria;
	searchValue = req.params.searchValue;

	var query = new Parse.Query(searchClass);
	if(!req.params.innerQuery){
		query.contains(searchCriteria, searchValue);
	}else{
		query.matchesQuery(searchCriteria, innerQuery);
	}

	query.find({
		success: function(results){
			 alert("Successfully retrieved " + results.length + searchClass);
		    // Do something with the returned Parse.Object values
		    for (var i = 0; i < results.length; i++) {
		      var object = results[i];
		      alert(object.id + ' - ' + object.get('playerName'));
		    }
		    response.success(results);
		},
		error: function(error){
			alert("Error: " + error.code + " " + error.message);
		}
	});
	
	
});


