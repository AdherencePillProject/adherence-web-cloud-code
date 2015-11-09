// This is required for using Parse
Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

// This function will create a new patient.
function CreateNewPatient(username, password, email, phone) {
	this.username = username;
	this.password = password;
	this.email = email;
	this.phone = phone;
}

// Save the patient to Parse
function saveNewPatient(patient) {
	var user = new Parse.User();
	user.set("username", patient['username']);
	user.set("password", patient['password']);
	user.set("email", patient['email']);
	user.set("phone", patient['phone']);

	user.signUp(null, {
		success: function(user) {
			// Hooray! Let them use the app now.
			alert("Successfully registered")
		},
		error: function(user, error) {
			// Show the error message somewhere and let the user try again.
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function login(username, password) {
	Parse.User.logIn("myname", "mypass", {
		success: function(user) {
			alert("You have successfully logged in!");
		},
		error: function(user, error) {
			alert("Invalid username/password combination");
	});
}