//namesToIndices = keeps track of which patient is selected
var namesToIndices = {};

//times available
//even if times aren't specified for a specific day we need to have it in the table
var timesAvailable = [];



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

	//element.id[4] because id is in form "name(num here)" and the number is the 4th character
	var num = parseInt(element.id[4]);

	var currActiveUser = namesToIndices[num];

	getPrescriptions(currActiveUser);
	timesAvailable = [];

}


//getPatientsInfo()
//parameters: none
//function: gets list of patients in Parse database and creates name divs in div id="patient_names"
function getPatientsInfo() {
	var patientList = Parse.Object.extend("Patient");
	var query = new Parse.Query(patientList);

	query.find().then(function(patients){
		console.log("Successfully retrieved " + patients.length + " patients.");
	    //GOT PATIENTS SUCCESSFULLY
	    for (var p = 0; p < patients.length; p++){
	    	var curr = patients[p];
	    	var currID = curr.get("userAccount")["id"];
	    	var userQuery = new Parse.Query(Parse.User);

	    	//for the person who is loaded first
	    	var count = 0;

	    	userQuery.get(currID).then(function(user) {
	    		var name = user.get("firstname") + " " + user.get("lastname");
	    		namesToIndices[count] = user;
	    		createNameDiv(name, count++);
	    	});

	    }

	});

	
}

//getPrescriptions()		
//parameters: user
//function: gets list of prescriptions associated with patient
//          creates prescription descriptions seen on left of screen
function getPrescriptions(user){

	//reset html
	var pd = document.getElementById("patient_descriptions");
	pd.innerHTML = "<button type='button' id='addBtn' class='btn btn-primary'><i class='fa fa-plus'></i> Add Prescription</button><br/>";


	var patientID = user.get("patientPointer");
	//error checking - make sure it is a patient
	if(typeof patientID == "undefined"){
		console.log(user.get("firstname") + " " + user.get("lastname") + " is not a patient. Is this user a doctor?")
		return;
	}


	//create query that will find the prescriptions of desired patient
	var prescriptionQuery = new Parse.Query(Parse.Object.extend("Prescription"));

	prescriptionQuery.equalTo("patientID", {
        __type: "Pointer",
        className: "Patient",
        objectId: patientID["id"]
    });


	prescriptionQuery.find().then(function(results){

		//if they have no prescriptions associated with them
		if(results.length == 0){
			noPrescriptionDiv(patientID);
			return;
		}

		//otherwise, go through each of their prescriptions
		for(var p = 0; p < results.length; p++){

			var curr = results[p];

			var drugName = curr.get("pillName");
			var schedule = curr.get("schedule");

			if(typeof schedule == "undefined"){
				console.log("Schedule has not been set for " + drugName + " for patient " + user.get("firstname") + " " + user.get("lastname") + ".");
				return;
			}
			//get each prescription's schedule
			getSchedule(schedule["id"], drugName, curr["id"], user);
		}

	});
	

		
	
	
}

//getSchedule()
//parameters: scheduleID, drugName, prescriptionID, patient
//function: gets schedule for certain perscription, along with its drug name
function getSchedule(scheduleID, drugName, prescriptionID, patient){

	var scheduleList = Parse.Object.extend("Schedule");
	var scheduleQuery = new Parse.Query(scheduleList);



	scheduleQuery.get(scheduleID).then(function(schedule){
		
		var mon = schedule.get("Monday");
		var tues = schedule.get("Tuesday");
		var wed = schedule.get("Wednesday");
		var thurs = schedule.get("Thursday");
		var fri = schedule.get("Friday");
		var sat = schedule.get("Saturday");
		var sund =schedule.get("Sunday");

		var days = [mon, tues, wed, thurs, fri, sat, sund];

		for(var d = 0; d < days.length; d++){
			var times = Object.keys(days[d]);
			for(var t = 0; t < times.length; t++){
				if(timesAvailable.indexOf(times[t]) == -1){
					timesAvailable.push(times[t]);
				}
			}
		}
		createPrescriptionDiv(drugName, prescriptionID, days, scheduleID, patient);
	});

}


//createPrescriptionDiv()
//parameters: drugName, prescriptionID, days, scheduleID, patient
//function: creates the html div of this prescription along with its schedule
function createPrescriptionDiv(drugName, prescriptionID, days, scheduleID, patient){

	//Add info to div id="patient_prescriptions"
	var pd = document.getElementById("patient_descriptions");
	

	var newA = document.createElement("a");
	newA.href = "#";
	newA.className = "list-group-item";
	newA.id = drugName + "" + prescriptionID;

	var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	var newP = "<h3 class='drug'>" + drugName + "</h3>" + 
				"<div class='table-responsive'>" + 
	  			"<table class='table table-responsive'>" +
		    		"<thead>" +
		      			"<tr>" +
		     			  "<th></th>"+
		        		  "<th>"+daysOfWeek[0]+"</th>" +
		        		  "<th>"+daysOfWeek[1]+"</th>" +
		        		  "<th>"+daysOfWeek[2]+"</th>" +
		        		  "<th>"+daysOfWeek[3]+"</th>" +
		        		  "<th>"+daysOfWeek[4]+"</th>" +
		        		  "<th>"+daysOfWeek[5]+"</th>" +
		        		  "<th>"+daysOfWeek[6]+"</th>" +
		        		 "<tr>" +
		    		"</thead>" +
		    		  "<tbody>";
    
    timesAvailable.sort(function (a, b) {
	  return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
	});

    for(var t = 0; t < timesAvailable.length; t++){
    	newP += "<tr>" +
    			"<th>" + timesAvailable[t] + "</th>";
    	for(var d = 0; d < days.length; d++){
    		var times = Object.keys(days[d]);

			//sort from earliest to latest time
			times.sort(function (a, b) {
			  return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
			});

			if(times.indexOf(timesAvailable[t]) > -1){
				var currDay = days[d];
				var index = times.indexOf(timesAvailable[t]);
				var currTime = times[index];

				//unique id is weekday + time
				var thisID = scheduleID + ":" + daysOfWeek[d] + "-" + currTime;
				newP += "<td><a href='#' id='" + thisID + "' class='doses'>" + currDay[currTime] + "</a></td>";
			}
			else {
				newP += "<td><a href='#' id='" + thisID + "' class='doses'>0</a></td>";
			}
    	}
    	newP += "</tr>";
    }


	var deleteBtnName = "deleteBtn" + prescriptionID;

	newP += "</tbody>" +
			  "</table>" +
		"</div>" + 
		    "<div class='btn-group' id='" + drugName + "btnGroup' role='group'>"+
			  "<button type='button' id='" + deleteBtnName + "' class='btn btn-default'>Delete</button>" +
			"</div>";
	
	
	newA.innerHTML += newP;

	pd.appendChild(newA);


	//delete description button
	document.getElementById(deleteBtnName).addEventListener("click", function(){
		deletePrescription(prescriptionID, patient);
	});

	//add prescription button
	document.getElementById("addBtn").addEventListener("click", function(){
		addPrescription(patient);
	});
 
	startUpdateDosage(scheduleID, drugName);


}

//createNameDiv()
//parameters: patientName, count
//function: creates div for name that shows up on the right

function createNameDiv(patientName, count){
	
	//Add their names to div id="patientNames"
	var pn = document.getElementById("patient_names");
	var newA = document.createElement("a");

	newA.href = "#";
	newA.id = "name" + count;
	newA.onclick = function() { toggleActive(this); }
	var name = document.createElement("h4");
	name.textContent = patientName;
	name.className = "list-group-item-heading";

	//first person loaded is highlighted

	if(count == 0){
		newA.className = "list-group-item active";
		//element.id[4] because id is in form "name[num here]"
		var num = parseInt(newA.id[4]);

		var currActiveUser = namesToIndices[num];

		getPrescriptions(currActiveUser);
		prescriptionList = {};
		timesAvailable = [];

	}
	else {
		newA.className = "list-group-item";
	}
	
	
	newA.appendChild(name);

	pn.appendChild(newA);



}



//startUpdateDosage()
//parameters: scheduleID, drugName
//function: starts process of updating dosage in database - creates properties for editable dosages
function startUpdateDosage(scheduleID, drugName){
	var dosages = document.getElementsByClassName("doses");
	for(var d = 0; d < dosages.length; d++){
		var aID = "#" + dosages[d].id;
		$(aID).editable({
	        type: 'number',
	        title: 'Select dosage',
	        placement: 'right',
	        value: dosages[d].innerHTML,
	        success: function(response, newValue){
	        	var dayOfWeek = this.id.slice(this.indexOf(":")+1, this.indexOf("-"));
	        	var timeOfDay = this.id.slice(this.indexOf("-")+1, this.length);
	        	updateDosage(scheduleID, drugName, dayOfWeek, timeOfDay, newValue);
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
function updateDosage(scheduleID, drugName, dayOfWeek, timeOfDay, newValue){

	// Create the object.
	var scheduleType = Parse.Object.extend("Schedule");
	var query = new Parse.Query(scheduleType);

	query.get(scheduleID, {
		success: function(schedule){
			var day = schedule.get(dayOfWeek);
			day[timeOfDay] = parseInt(newValue);
			day.save();
			console.log("Dosage successfully updated for " + newValue + " pills on " + dayOfWeek + " at " + timeOfDay);
		},
		error: function(object, error){
			console.log("Error in retrieving scheduleID in updateDosage: " + error.code + " " + error.message);
		}

	});

}


//addPrescription()
//parameters: patient
//function: creates div (AND LATER ADDS TO DATABASE) to allow user to add prescription to patient
function addPrescription(patient){

	//temporarily remove addBtn
	var addBtnHTML = $("#addBtn").html();
	$("#addBtn").remove();

	var divHTML = $("#patient_descriptions").html();

	var addPrescriptionForm = "<a class='list-group-item'>"+
								"<form>"+
								"<h3>Add New Prescription</h3>"+
	  								"<fieldset class='form-group' id='newPrescriptionForm'>"+
	    								"<label for='newPrescriptionName'>Prescription Name:</label>"+
	    								"<input type='text' class='form-control' id='newPrescriptionName' placeholder=''>"+
	    								"<br/>"+
	  									"<button class='btn btn-default' id='addTime'>Add Time</button><br/>"+
	  									"<br/>"+
	  									"<div class='form-group'>"+
											"<label class='time'>Time</label>"+
								    		"<input type='time' class='form-control' placeholder=''>"+
										"</div>"+
	  									"<table>"+
	  									"<tbody>"+

										"<td><div class='form-group'>"+
											"<label class='day'>Monday</lable>"+
								    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
										"</div></td>"+
										"<td><div class='form-group'>"+
											"<label class='day'>Tuesday</lable>"+
								    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
										"</div></td>"+
										"<td><div class='form-group'>"+
											"<label class='day'>Wednesday</lable>"+
								    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
										"</div></td>"+
										"<td><div class='form-group'>"+
											"<label class='day'>Thursday</lable>"+
								    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
										"</div></td>"+
										"<td><div class='form-group'>"+
											"<label class='day'>Friday</lable>"+
								    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
										"</div></td>"+
										"<td><div class='form-group'>"+
											"<label class='day'>Saturday</lable>"+
								    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
										"</div></td>"+
										"<td><div class='form-group'>"+
											"<label class='day'>Sunday</lable>"+
								    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
										"</div></td>"+

										"</tbody>"+
										"</table>"+
										"<br/>"+
								    	
	  								"</fieldset>"+
	  								"<button class='btn btn-primary' type='submit'>Submit</button>"+

							   	"</form>"+
							  "</a>";

	divHTML = addPrescriptionForm + divHTML;

	$("#patient_descriptions").html(divHTML);


	
	//adds new time option to add prescription div if user clicks "Add Time" button
	$(document.body).on("click", '#addTime', function(){
		addForm();
	});

	function addForm(){
		var formHTML = $("#newPrescriptionForm").html();
		var newFieldSet = "<div class='form-group'>"+
								"<label class='time'>Time</label>"+
					    		"<input type='time' class='form-control' placeholder=''>"+
							"</div>"+
								"<table>"+
								"<tbody>"+

							"<td><div class='form-group'>"+
								"<label class='day'>Monday</lable>"+
					    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
							"</div></td>"+
							"<td><div class='form-group'>"+
								"<label class='day'>Tuesday</lable>"+
					    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
							"</div></td>"+
							"<td><div class='form-group'>"+
								"<label class='day'>Wednesday</lable>"+
					    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
							"</div></td>"+
							"<td><div class='form-group'>"+
								"<label class='day'>Thursday</lable>"+
					    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
							"</div></td>"+
							"<td><div class='form-group'>"+
								"<label class='day'>Friday</lable>"+
					    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
							"</div></td>"+
							"<td><div class='form-group'>"+
								"<label class='day'>Saturday</lable>"+
					    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
							"</div></td>"+
							"<td><div class='form-group'>"+
								"<label class='day'>Sunday</lable>"+
					    		"<input type='number' class='form-control' placeholder='# of Pills'>"+
							"</div></td>"+

							"</tbody>"+
							"</table>"+
							"<br/>";
		formHTML += newFieldSet;
		$("#newPrescriptionForm").html(formHTML);
	}


	//ADD FUNCTIONALITY TO ADD NEW PRESCRIPTION HERE

}



//deletePrescription()
//parameters: prescriptionID, patient
//function: deletes specified prescription from page and from database
function deletePrescription(prescriptionID, patient){
	debugger;
	//delete Prescritpion, Schedule, prescriptions_list in patient
	var prescriptionType = Parse.Object.extend("Prescription");
	var query = new Parse.Query(prescriptionType);
	
	


	query.get(prescriptionID, {
		success: function(pres) {
			//delete schedule associated with pill
			var sched = pres.get("schedule");
			
			//destroy schedule
			destroySchedule(sched);

			
			pres.destroy({
				success: function(myObject){
					var prescripIDs = patient.get("patientPointer").get("prescriptions");
					console.log("Successfully deleted " + myObject.get("pillName"));

					
					//finally, delete from webpage
					//this follows the format specified in createPrescriptionDiv()
					var pill = "#" + myObject.get("pillName") + "" + myObject["id"];
					$(pill).remove();

					//we have no more prescriptions, clear div
					if($("#patient_descriptions > a").length <= 0){
						noPrescriptionDiv(patient);
					}

					//reload the webpage to show new prescription list
					location.reload();
				},
				error: function (myObject, error){
					console.log("Error in retrieving scheduleID in updateDosage: " + error.code + " " + error.message);
				}

			});
		},
		error: function(object, error){
			console.log("Error in finding prescription with ID: " + prescriptionID + " : " + error.code + " " + error.message);
		}

	});

}


//destroySchedule()
//parameters: schedule
//function: deletes schedule from database
function destroySchedule(sched){
	sched.destroy({
	  success: function(myObject) {
	    console.log("Schedule " + myObject.id + " successfully deleted");
	  },
	  error: function(myObject, error) {
	    // The delete failed.
	    // error is a Parse.Error with an error code and message.
	    console.log("Deletion of schedule " + myObject.id + " failed, error: " + error.code + ", " + error.message);
	  }
	});

}



//noPrescriptionDiv()
//parameters: patient
//function: creates div for when patient has no prescriptions
function noPrescriptionDiv(patient){
	var pd = document.getElementById("patient_descriptions");
	pd.innerHTML = "<button type='button' id='addBtn' class='btn btn-primary'><i class='fa fa-plus'></i> Add Prescription</button>";

 
	var newA = document.createElement("a");
	newA.href = "#";
	newA.className = "list-group-item";
	newA.innerHTML = "<h3 class='drug'>No Prescriptions On Record</h3>";
	pd.appendChild(newA);

	//add prescription button
	document.getElementById("addBtn").addEventListener("click", function(){
		addPrescription(patient);
	});
 

}

//main()
function main(){
	Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");
	//get patients
	getPatientsInfo();
}


main();
