// This is required for using Parse
Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

function resetPassword(email, redirectUrl) {
	Parse.User.requestPasswordReset(email, {
		success: function() {
			window.location.replace(redirectUrl);
		},
		error: function(error) {
			// Show the error message somewhere
			alert("Error: " + error.code + " " + error.message);
		}
	});
	event.preventDefault();
}