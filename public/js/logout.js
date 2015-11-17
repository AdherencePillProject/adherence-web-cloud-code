// This is required for using Parse
Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

function logout() {
	Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");
	var max, count;
	count = 0;
	max = 100;
	var currentUser = Parse.User.current();
	while (currentUser != null && count < max){
		Parse.User.logOut();
		count = count + 1;
		currentUser = Parse.User.current();
	}
	if(currentUser){
		alert("Failed to log you out. Please try to clear cache and try again.");
	}else{
		window.location.replace("login.html");
	}
	event.preventDefault();	
}