Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

// This function will create a prescription associated with the user.
function addPrescription(patient, formPrescription) {
	Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");
	if(patient == null){
		patient = Parse.User.current();
	}
	var prescription = new Parse.Object("Prescription");
	var prescriptionDetail = new Parse.Object("PrescriptionDetails");
	var pill = new Parse.Object("Pill");

	var formPrescriptionDetail = formPrescription.details;
	var formPill = formPrescriptionDetail.pill;

	pill.set("name", formPill.name);
	pill.set("description", formPill.description);
	pill.set("weightPerPill", formPill.weight_per_pill);

	//pill.save();

	prescriptionDetail.set("pillID", pill);
	prescriptionDetail.set("pillPerTime", formPrescriptionDetail.pills_per_time);
	prescriptionDetail.set("pillsTotal", formPrescriptionDetail.pills_total);
	prescriptionDetail.set("prescriptionID", prescription);
	prescriptionDetail.set("startTime", formPrescriptionDetail.start_time);
	prescriptionDetail.set("stopTime", formPrescriptionDetail.stop_time);
	prescriptionDetail.set("pillPerTime", formPrescriptionDetail.times_per_day);

	//prescriptionDetail.save();

	prescription.set("patientID", patient);
	
	//prescription.save();
	prescription.save(null, {
		success: function(prescription){
			alert("The prescription is saved successfully");
		},
		error: function(error){
			alert("Failed to save prescription with error code: " + error.code + error.message);
		}
	});
	prescriptionDetail.save(null, {
		success: function(prescriptionDetail){
			alert("The prescription detail is saved successfully");
		},
		error: function(error){
			alert("Failed to save prescription detail with error code: " + error.code + error.message);
		}
	});
	pill.save(null, {
		success: function(pill){
			alert("The pill is saved successfully");
		},
		error: function(error){
			alert("Failed to save pill with error code: " + error.code + error.message);
		}
	});

	event.preventDefault();
}