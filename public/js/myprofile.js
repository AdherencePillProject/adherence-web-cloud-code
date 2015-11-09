Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

function getUsername() {
	var user = Parse.User.current();
	if (user == null) {
		alert("Please login first");
		window.location.replace("login.html");
		event.preventDefault();
	} else {
		return Parse.User.current().getUsername();
	}
}

function getEmail() {
	var user = Parse.User.current();
	if (user == null) {
		alert("Please login first");
		window.location.replace("login.html");
	} else {
		return Parse.User.current().getEmail();
	}
}

function saveChanges(passwd, email, redirectUrl) {
	var user = Parse.User.current();
	user.setPassword(passwd);
	user.setEmail(email);
	user.save({
		success: function(user) {
			// The save was successful.
			alert("Your profile has been successfully changed.");
			window.location.replace(redirectUrl);
		},
		error: function(user, error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
	event.preventDefault();
}