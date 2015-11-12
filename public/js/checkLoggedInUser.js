// This is required for using Parse
Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

function loggedInUser() {
	Parse.Cloud.run('loggedInUser', {}, {
		success: function(user) {
			alert("Current user is: " + user.getUsername());
		},
		error: function(error) {
			alert("Error: " + error.message);
			window.location.replace("login.html");

		}
	});
}