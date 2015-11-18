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

// Save the patient to Parse
function saveNewUser(user){


}
function saveNewPatient(patient, redirectUrl) {
	var user = new Parse.User();
	user.set("username", patient.email);
	user.set("password", patient.password);
	user.set("email", patient.email);
	user.set("phone", patient.phone);
	user.set("firstname", patient.firstname);
	user.set("lastname", patient.lastname);
	if(patient.sex == 0){
		user.set("geneder", "Male");
	}else if(patient.sex == 1){
		user.set("gender", "Female");
	}
	
	user.signUp(null, {
		success: function(user) {
			// Hooray! Let them use the app now.
			Parse.Cloud.run('setUserRole', { accountType: patient.accountType }, {
		  		success: function(ratings) {
		  			alert("The user role has been successfully set to " + patient.accountType);
		  		},
		  		error: function(error) {
		  			alert("Failed to set user role to " + patient.accountType + " " + error.code + " " + error.message);
		  		}
			});
			alert("Successfully registered");
			window.location.replace(redirectUrl);
		},
		error: function(user, error) {
			// Show the error message somewhere and let the user try again.
			alert("Error: " + error.code + " " + error.message);
		}
	});
	event.preventDefault();
}