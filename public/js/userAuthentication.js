// This is required for using Parse
Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

function userAuthenticate(username, password, redirectUrl) {
	Parse.User.logIn(username, password, {
		success: function(user) {
			alert("You have successfully logged in!");
			window.location.replace(redirectUrl);
		},
		error: function(user, error) {
			alert("Invalid username/password combination" + error.code + " " + error.message);
		}
	});
	event.preventDefault();	
}