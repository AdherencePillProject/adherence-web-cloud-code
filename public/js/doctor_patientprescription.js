//namesToIndices = keeps track of which patient is selected
var namesToIndices = {};

//whether the prescription is part of the same patient or not
var sameDiv = false;


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
	for(var p = 0; p < prescripIDs.length; p++){
		query.get(prescripIDs[p], {
			success: function(currPrescrip){
				var drugName = currPrescrip.get("pillName");
				console.log("Successfully retrieved " + drugName + " for patient: " + currPrescrip.get("patientID"));

				var scheduleID = currPrescrip.get("schedule");
				if(typeof scheduleID != "undefined"){
					getSchedule(scheduleID, drugName, sameDiv);
				}
				if (p != 0) { sameDiv = true; }
			},
			error: function(object, error){
				console.log("Error in retrieving prescriptions list: " + error.code + " " + error.message);
			}
		});
	}
	
}

//getSchedule()
//parameters: scheduleID, drugName
//function: gets schedule for certain perscription, along with its drug name
function getSchedule(scheduleID, drugName, sameDiv){

	var scheduleList = Parse.Object.extend("Schedule");
	var scheduleQuery = new Parse.Query(scheduleList);

	var mon, tues, wed, thurs, fri, sat, sund;


	scheduleQuery.get(scheduleID["id"], {
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
			createPrescriptionDiv(drugName, sameDiv, days);
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
//parameters: drugName, days of week
//function: creates prescription description shown on left of screen when a certain patient is selected
function createPrescriptionDiv(drugName, sameDiv, days){
	//Add info to div id="patient_prescriptions"
	var pn = document.getElementById("patient_descriptions");

	if(!sameDiv) { pn.innerHTML = ""; }
	


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
		newP += "<tr>" + 
			      "<td>" + days[d][0] + "</td>" +
			      "<td>" + days[d][1] + "</td>" +
			    "</tr>";
	}

	newP += "</tbody>" +
			  "</table>" +
		    "<div class='btn-group' role='group'>"+
			  "<button type='button' class='btn btn-default'>Edit</button>" +
			  "<button type='button' class='btn btn-default'>Save</button>" +
			  "<button type='button' class='btn btn-default'>Delete</button>" +
			"</div>";
	
	newA.innerHTML += newP;

	pn.appendChild(newA);
}

//main()
function main(){
	Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");
	getPatients();	
}

main();
