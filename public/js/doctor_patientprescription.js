//namesToIndices = keeps track of which patient is selected
var namesToIndices = {};

//whether the prescription is part of the same patient or not
var sameDiv = false;

//keeps track of which prescription number we are on
var prescriptionNum = 0;


//toggleActive
//parameters: div element
//function: toggles the active class element for divs on the right
//           loads prescription data for selected patient
function toggleActive(element){
	//should only be one
	var actives = document.getElementsByClassName("list-group-item active");
	for (var i = 0; i < actives.length; i++){
		actives[i].className = "list-group-item";
	}
	element.className = "list-group-item active";

	//element.id[4] because id is in form "name[num here]"
	var num = parseInt(element.id[4]);

	var currActiveUser = namesToIndices[num];

	getPrescriptions(currActiveUser);

}


//getPatients()
//parameters: none
//function: gets list of patients in Parse database and creates name divs in div id="patient_names"
function getPatients() {
	var patientList = Parse.Object.extend("Patient");
	var query = new Parse.Query(patientList);

	query.find({
	  success: function(patients) {
	    console.log("Successfully retrieved " + patients.length + " patients.");
	    //GOT PATIENTS SUCCESSFULLY
	    for (var p = 0; p < patients.length; p++){
	    	var curr = patients[p];
	    	var currID = curr.get("userAccount")["id"];
	    	var userQuery = new Parse.Query(Parse.User);

	    	//for the person who is loaded first
	    	var count = 0;

	    	//GET PATIENT NAME (FROM USER OBJECT)
	    	userQuery.get(currID, {
	    		success: function(user){
	    			var name = user.get("firstname") + " " + user.get("lastname");
	    			namesToIndices[count] = user;
	    			createNameDiv(name, count++);

	    		},
	    		error: function(object, error){
	    			console.log("Error in retrieving patients name list: " + error.code + " " + error.message);
	    		}

	    	});

	    }
	  },
	  error: function(error) {
	    console.log("Error in retrieving patients list: " + error.code + " " + error.message);
	  }
	});
}

//getPrescriptions()
//parameters: patient
//function: gets list of prescriptions associated with patient
//          creates prescription descriptions seen on left of screen
function getPrescriptions(patient){

	var prescription_list = Parse.Object.extend("Prescription");
	var query = new Parse.Query(prescription_list);

	var prescripIDs = patient.get("patientPointer").get("prescriptions");

	if(typeof prescripIDs == "undefined"){
		var pn = document.getElementById("patient_descriptions");
		pn.innerHTML = "";

		var newA = document.createElement("a");
		newA.href = "#";
		newA.className = "list-group-item";
		newA.innerHTML = "<h3 class='drug'>No Prescriptions On Record</h3>";
		pn.appendChild(newA);

		return;
	}
	sameDiv = false;
	prescriptionNum = 0;
	for(var p = 0; p < prescripIDs.length; p++){
		query.get(prescripIDs[p], {
			success: function(currPrescrip){
				var drugName = currPrescrip.get("pillName");
				console.log("Successfully retrieved " + drugName + " for patient " + currPrescrip["id"]);

				var schedule = currPrescrip.get("schedule");
				if(typeof schedule != "undefined"){
					getSchedule(schedule["id"], drugName, sameDiv, prescriptionNum, currPrescrip["id"], patient);
				}
				if (p != 0) { sameDiv = true; }
				prescriptionNum++;
			},
			error: function(object, error){
				console.log("Error in retrieving prescriptions list: " + error.code + " " + error.message);
			}
		});
	}
	
}

//getSchedule()
//parameters: scheduleID, drugName, sameDiv, prescriptionNum, patient
//function: gets schedule for certain perscription, along with its drug name
function getSchedule(scheduleID, drugName, sameDiv, prescriptionNum, prescriptionID, patient){

	var scheduleList = Parse.Object.extend("Schedule");
	var scheduleQuery = new Parse.Query(scheduleList);

	var mon, tues, wed, thurs, fri, sat, sund;


	scheduleQuery.get(scheduleID, {
		success: function(schedule){
			mon = schedule.get("Monday");
			tues = schedule.get("Tuesday");
			wed = schedule.get("Wednesday");
			thurs = schedule.get("Thursday");
			fri = schedule.get("Friday");
			sat = schedule.get("Saturday");
			sund = schedule.get("Sunday");

			var days = [["Monday", mon],
						["Tuesday", tues],
						["Wednesday", wed],
						["Thursday", thurs],
						["Friday", fri],
						["Saturday", sat],
						["Sunday", sund]];
			createPrescriptionDiv(drugName, sameDiv, days, scheduleID, prescriptionNum, prescriptionID, patient);
		},
		error: function(object, err){
			console.log("Error in retrieving schedule: " + err.code + " " + err.message);
		}

	});

}

//createNameDiv()
//parameters: patient_name, count
//function: creates div for name that shows up on the right

function createNameDiv(patient_name, count){
	
	//Add their names to div id="patient_names"
	var pn = document.getElementById("patient_names");
	var newA = document.createElement("a");

	newA.href = "#";
	newA.id = "name" + count;
	newA.onclick = function() { toggleActive(this); }
	var name = document.createTextNode(patient_name);

	//first person loaded is highlighted

	if(count == 0){
		newA.className = "list-group-item active";
		//element.id[4] because id is in form "name[num here]"
		var num = parseInt(newA.id[4]);

		var currActiveUser = namesToIndices[num];

		getPrescriptions(currActiveUser);

	}
	else {
		newA.className = "list-group-item";
	}
	
	
	newA.appendChild(name);

	pn.appendChild(newA);

}

//createPrescriptionDiv()
//parameters: drugName, sameDiv, days, scheduleID, prescriptionNum, prescriptionID
//function: creates prescription description shown on left of screen when a certain patient is selected
function createPrescriptionDiv(drugName, sameDiv, days, scheduleID, prescriptionNum, prescriptionID, patient){
	//Add info to div id="patient_prescriptions"
	var pn = document.getElementById("patient_descriptions");

	if(!sameDiv) {
		pn.innerHTML = "";
	}
	

	var newA = document.createElement("a");
	newA.href = "#";
	newA.className = "list-group-item";

	var newP = "";

	newP += "<h3 class='drug'>" + drugName + "</h3>" + 
	  			"<table class='table'>" +
		    		"<thead>" +
		      			"<tr>" +
			      		  "<th>Day of Week</th>" +
		        		  "<th># of Pills</th>" +
		        		 "<tr>" +
		    		"</thead>" +
		    		  "<tbody>";


	for (var d = 0; d < days.length; d++){
		var thisID = days[d][0] + "" + prescriptionNum;
		newP += "<tr>" + 
			      "<td>" + days[d][0] + "</td>" +
			      "<td><a href='#' id='" + thisID + "' class='doses'>" + days[d][1] + "</a></td>" +
			    "</tr>";

	    
	}

	newP += "</tbody>" +
			  "</table>" +
		    "<div class='btn-group' role='group'>"+
			  "<button type='button' id='deleteBtn' class='btn btn-default'>Delete</button>" +
			"</div>";
	
	
	newA.innerHTML += newP;

	pn.appendChild(newA);

	// document.getElementById("deleteBtn").addEventListener("click", function(){
	// 	deletePrescription(prescriptionID, patient);
	// });


	startUpdateDosage(scheduleID, drugName);
}



//startUpdateDosage()
//parameters: scheduleID, drugName
//function: starts process of updating dosage in database - creates properties for editable dosages
function startUpdateDosage(scheduleID, drugName){
	var dosages = document.getElementsByClassName("doses");
	for(var d = 0; d < dosages.length; d++){
		var aID = dosages[d].id;
		$("#"+aID).editable({
	        type: 'number',
	        title: 'Select dosage',
	        placement: 'right',
	        value: dosages[d].innerHTML,
	        success: function(response, newValue){
	        	updateDosage(scheduleID, drugName, this.id.slice(0, -1), newValue);
	        	console.log("Successfully updated dosage to " + newValue);
	        },
	        error: function(response, newValue){
	        	console.log("Could not update dosage: " + response.responseText);
	        }
	    });
	}

}


//udpateDosage()
//parameters: scheduleID, drugName, dayOfWeek, newValue
//function: updates database to reflect change in dosage
function updateDosage(scheduleID, drugName, dayOfWeek, newValue){
	// Create the object.
	var scheduleType = Parse.Object.extend("Schedule");
	var query = new Parse.Query(scheduleType);

	query.get(scheduleID, {
		success: function(day){
			day.set(dayOfWeek, parseInt(newValue));
			day.save();
			console.log("Dosage successfully updated for " + newValue + " pills on " + dayOfWeek);
		},
		error: function(object, error){
			console.log("Error in retrieving scheduleID in updateDosage: " + error.code + " " + error.message);
		}

	});

}

function deletePrescription(prescriptionID, patient){
	// var prescriptionType = Parse.Object.extend("Prescription");
	// var query = new Parse.Query(prescriptionType);

	// query.get(prescriptionID, {
	// 	success: function(pres) {
	// 		debugger;

	// 		pres.destroy({
	// 			success: function(myObject){
	// 				var prescripIDs = patient.get("patientPointer").get("prescriptions");
	// 				console.log("Successfully deleted " + myObject);
	// 			},
	// 			error: function (myObject, error){
	// 				console.log("Error in retrieving scheduleID in updateDosage: " + error.code + " " + error.message);
	// 			}

	// 		});
	// 	},
	// 	error: function(object, error){
	// 		console.log("Error in finding prescription with ID: " + prescriptionID + " : " + error.code + " " + error.message);
	// 	}

	// });
}

//main()
function main(){
	getPatients();	
}

Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");
main();
