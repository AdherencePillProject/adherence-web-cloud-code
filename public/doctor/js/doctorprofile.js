Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

function getDoctorInfo() {
	var user = Parse.User.current();
	if (user == null) {
		alert("Please login first");
		window.location.replace("login.html");
		event.preventDefault();
	} else {
		var patients = Parse.Object.extend("Patient");
		var query = new Parse.Query(patients);
		query.equalTo("userAccount", {
			__type: "Pointer",
			className: "_User",
			objectId: user.id
		});
		// query.include("Doctors");
		query.find({
			success: function(results) {
				// alert("Found " + results.length + " results with the given id: " + user.id);

				for (var i = 0; i < results.length; i++) {
					var patient = results[i];
					var doctors = patient.relation('Doctors');
					var query = doctors.query();
					query.include("userAccount");
					query.find({
						success: function(doctors) {
							// toppings is a list of toppings for this pizza
							for (var j = 0; j < doctors.length; j++) {
								var doctorUser = doctors[j].get("userAccount");
								var name = doctorUser.get("firstname") + " " + doctorUser.get("lastname");
								var number = '';
								var email = doctorUser.get("email");
								var clinic = doctors[j].get("hospitalName");
								updateInfo(name, number, email, clinic);
								//alert("firstname: " + doctorUser.get("firstname") + ", lastname: " + doctorUser.get("lastname"));
							}
						}
					});
				}
			}, // Be very careful about the comma
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}
	return user.getUsername();
}

function updateInfo(name, number, email, clinic) {
	document.getElementById("name").innerHTML = "Name: " + name;
	document.getElementById("phoneNumber").innerHTML = "Phone Number: " + number;
	document.getElementById("email").innerHTML = "Email: " + email;
	document.getElementById("clinic").innerHTML = "Clinic: " + clinic;

}