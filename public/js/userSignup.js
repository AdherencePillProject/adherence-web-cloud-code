// This is required for using Parse
Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

// This function will create a new patient.
function CreateNewPatient(username, password, email, phone, firstname, lastname) {
	var patient = new Object();
	patient.username = username;
	patient.password = password;
	patient.email = email;
	patient.phone = phone;
	return patient;
}

// Save the new user to Parse
function saveNewUser(user, accountType, additionalInfo, redirectUrl){
	event.preventDefault();
	newUser = new Parse.User();
	newUser.set("username", user.email);
	newUser.set("password", user.password);
	newUser.set("email", user.email);
	newUser.set("phone", user.phone);
	newUser.set("firstname", user.firstname);
	newUser.set("lastname", user.lastname);
	if(user.gender == 0){
		newUser.set("gender", "Male");
	}else if(user.gender == 1){
		newUser.set("gender", "Female");
	}
	
	newUser.signUp(null, {
		success: function(newUser) {
			// Hooray! Let them use the app now.
			Parse.Cloud.run('setUserRole', { accountType: user.accountType }, {
		  		success: function(role) {
		  			alert("The user role has been successfully set to " + user.accountType);
		  			if(accountType.toLowerCase() == "patient"){
						Parse.Cloud.run('setPatient', { username: newUser.getUsername() }, {
		  					success: function(newUser) {
		  						alert("The patient is successfully set");
		  						window.location.replace(redirectUrl);
		  					},
		  					error: function(error) {
		  						alert("Failed to set patient " + error.code + " " + error.message);
		  					}
						});
					}else if(accountType.toLowerCase() == "doctor"){
						newUser.set("userType", ["Doctor"]);
						var doctor = new Parse.Object("Doctor");
						doctor.set("address", additionalInfo.address);
						doctor.set("hospitalCity", additionalInfo.hospitalCity);
						doctor.set("hospitalName", additionalInfo.hospitalName);
						doctor.set("userAccount", newUser);
						doctor.save(null, {
							success: function(doc) {
								newUser.set("doctorPointer", doc);
								newUser.save();
								window.location.replace(redirectUrl);
							}
						});
						
					}else if(accountType.toLowerCase() == "pharmacy"){
						newUser.set("userType", ["PharmacyStuff"]);
					}
		  		},
		  		error: function(error) {
		  			alert("Failed to set user role to " + user.accountType + " " + error.code + " " + error.message);
		  		}
			});
			alert("Successfully registered");
		},
		error: function(newUser, error) {
			// Show the error message somewhere and let the user try again.
			alert("Error: " + error.code + " " + error.message);
		}
	})
}