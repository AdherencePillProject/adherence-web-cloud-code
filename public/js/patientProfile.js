//Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

function getUsername() {
	var user = Parse.User.current();
	if (user == null) {
		alert("Please login first");
		window.location.replace("login.html");
		event.preventDefault();
	} else {
		user.fetch(null, {
			success: function(user) {},
			error: function(user, error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}
	return user.getUsername();
}

function getEmail() {
	var user = Parse.User.current();
	if (user == null) {
		alert("Please login first");
		window.location.replace("login.html");
	} else {
		user.fetch(null, {
			success: function(user) {},
			error: function(user, error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}
	return user.getEmail();;
}

function createNameDiv() {
	var pn = document.getElementById("patient_names");
	console.log(getEmail());
}

// As required by Yeyi, for the patient sorting issue.
function getPatientsInfo2() {

	var patientList = Parse.Object.extend("Patient");
	var query = new Parse.Query(patientList);

	// Include user account info so we don't have to do another query
	query.include('userAccount').ascending('firstname');

	// Use a dict to save name/user pairs and sort later
	var unsortedNames = [];

	query.find({
		success: function(patients) {
			for (var i = 0; i < patients.length; i++) {
				var user = patients[i].get("userAccount");

				// In some cases where userAccount is null, we need to double check.
				// Though the userAccount should NOT be null in any cases.
				// But with all the testing data, we never know.

				if (user != undefined) {
					//alert(user);
					var firstname = user.get("firstname");
					var lastname = user.get("lastname");
					if (firstname != undefined && lastname != undefined) {

						var name = firstname + " " + lastname;
						// Use user as the key here because of the bad data sample where multiple
						// different patient accounts are pointing to the same user account which is 
						// odd.
						var userAndName = {
							name: name,
							user: user
						};
						unsortedNames.push(userAndName);
						// var name = user["firstname"] + " " + user["lastname"];
						// namesToIndices[i] = user;
						// createNameDiv(name, i);
					}
				}
			}


			// sortedNames.push.apply(sortedNames, Object.keys(unsortedUsers));
			// Ascending, for descending, use sortedNames.sort().reverse()
			// Or, use a customized rule. There is no out-of-box sorting for a nested query.
			unsortedNames.sort(function(a, b) {
				if (a["name"] < b["name"]) {
					return -1;
				}
				if (a["name"] > b["name"]) {
					return 1;
				}

				return 0;
			});
			for (var i = 0; i < unsortedNames.length; i++) {
				var sortedUser = unsortedNames[i]["user"];
				var sortedName = unsortedNames[i]["name"];
				namesToIndices[i] = sortedUser;
				createNameDiv(sortedName, i);
			}
		},
		error: function(error) {
			alert(error.message);
		}
	});
}


function saveChanges(passwd, email, redirectUrl) {
	var user = Parse.User.current();
	user.setPassword(passwd);
	user.setEmail(email);
	user.save({
		success: function(user) {
			// The save was successful
			alert("Your profile has been successfully changed.");
		},
		error: function(user, error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
	window.location.replace(redirectUrl);
	event.preventDefault();
}

//main()
function main() {
	Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");
	//get patients
	createNameDiv();
}


main();