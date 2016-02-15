Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

function searchPatient(patientName) {
	var innerQuery = new Parse.Query(Parse.User);
	innerQuery.contains("username", patientName);
	var searchCriteria = "userAccount";
	var parsePatient = Parse.Object.extend("Patient");
	var query = new Parse.Query(parsePatient);
	query.matchesQuery(searchCriteria, innerQuery);
	query.include("userAccount");

	query.find({
		success: function(results){
			 alert("Successfully retrieved " + results.length);
		    // Do something with the returned Parse.Object values
		    for (var i = 0; i < results.length; i++) {
		      var object = results[i];
		      alert(object.id + ' - ' + object.get("userAccount").get("email"));
		    }
		},
		error: function(error){
			alert("Error: " + error.code + " " + error.message);
		}
	});
}