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
	//var prescripIDs = patient.get("patientPointer").get("prescriptions");

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
	    	var pillName = curr.get("prescriptions");

	    	//GET PATIENT NAME (FROM USER OBJECT)
	    	userQuery.get(currID, {
	    		success: function(user){
	    			var name = user.get("firstname") + " " + user.get("lastname");
	    			namesToIndices[count] = user;
	    			createNameDiv(name, count++, pillName);

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

//createNameDiv()
//parameters: patient_name, count
//function: creates div for name that shows up on the right

function createNameDiv(patient_name, count, pillName){	
	//Add their names to div id="patient_names"
	var pn = document.getElementById("patien_names");
	var newA = document.createElement("a");

	newA.href = "#";
	newA.id = "name" + count;
	newA.onclick = function() { 
		patient0Clicked(this, pillName);
	}
	var name = document.createElement("h4");
	name.textContent = patient_name;
	name.className = "list-group-item-heading";

	//first person loaded is highlighted
	if(count == 0){
		newA.className = "list-group-item active";
		//element.id[4] because id is in form "name[num here]"
		var num = parseInt(newA.id[4]);
		var currActiveUser = namesToIndices[num];
	}
	else {
		newA.className = "list-group-item";
	}
		
	newA.appendChild(name);
	pn.appendChild(newA);
}
function createCheckBoxes (pillName) {
	var cb_left = document.getElementById("checkbox-left");
	var newDiv = document.createElement("div");
	newDiv.className = "checkbox";
	
	var input = document.createElement("input");
	input.type = "checkbox";
	input.id = "checkbox" + "1";
	

	var cblabel = document.createElement("span");
	cblabel.textContent = pillName;

	var label = document.createElement("label");
	label.appendChild(input);
	label.appendChild(cblabel);

	newDiv.appendChild(label);
	cb_left.appendChild(newDiv);

}
function patient0Clicked(ev, pillName) {
	toggleActive(ev);
	// createCheckBoxes(pillName);
}


//main()
function main(){
	getPatients();	
}

Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");
main();
