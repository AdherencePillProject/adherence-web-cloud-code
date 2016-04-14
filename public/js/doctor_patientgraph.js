//namesToIndices = keeps track of which patient is selected
var namesToIndices = {};

//whether the prescription is part of the same patient or not
var sameDiv = false;

//keeps track of which prescription number we are on
var prescriptionNum = 0;

var color = ["rgba(255, 255, 255,1)", "rgba(197, 17, 98,1)", "rgba(0, 145, 234,1)", "rgba(30, 100, 234,1)"];

var options = {
  // fixes height of y-axis to be 24
  scaleOverride: true,
  scaleStartValue: 0,
  scaleStepWidth: 2,
  scaleSteps: 12,

  ///Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines : true,
  //String - Colour of the grid lines
  scaleGridLineColor : "rgba(0,0,0,0.05)",
  //Number - Width of the grid lines
  scaleGridLineWidth : 1,
  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,
  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: false,
  //Boolean - Whether the line is curved between points
  bezierCurve : false,
  //Number - Tension of the bezier curve between points
  bezierCurveTension : 0.3,
  //Boolean - Whether to show a dot for each point
  pointDot : true,
  //Number - Radius of each point dot in pixels
  pointDotRadius : 5,
  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth : 1,
  //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius : 20,
  //Boolean - Whether to show a stroke for datasets
  datasetStroke : true,
  //Number - Pixel width of dataset stroke
  datasetStrokeWidth : 2,
  //Boolean - Whether to fill the dataset with a colour
  datasetFill : true,
  //String - A legend template
  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
};
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

var pills = ["pill1", "pill2", "pill3"];

var bool_arry = {};
bool_arry["pill1"] = true;
bool_arry["pill2"] = true;
bool_arry["pill3"] = true;

var pill_time = {};
pill_time[pills[0]] = [1,2,3,4,5,6,7];
pill_time[pills[1]] = [4,2,1,3,5,4,7];
pill_time[pills[2]] = [21,22,4,9,3,6,7];


function createNameDiv(patient_name, count, pillName){	
	//Add their names to div id="patient_names"
	var pn = document.getElementById("patien_names");
	var newA = document.createElement("a");

	newA.href = "#";
	newA.id = "name" + count;
	newA.onclick = function() { 
		patientClicked(this, patient_name);
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

	// console.log("Children number", cb_left.childNodes.length)

	// while(cb_left.childNodes.length > 4){
	// 	cb_left.removeChild(cb_left.childNodes[cb_left.childNodes.length - 1]);
	// }

	// for(var i = 0; i < pillName.length; i++){
		var newDiv = document.createElement("div");

		newDiv.className = "checkbox";
		var input = document.createElement("input");
		input.type = "checkbox";
		input.checked = true;
		input.id = pillName;
		input.onclick = function(){
			onClickCB(this, input.id);
		}

		var cblabel = document.createElement("span");
		cblabel.textContent = pillName;

		var label = document.createElement("label");
		label.appendChild(input);
		label.appendChild(cblabel);

		newDiv.appendChild(label);
		cb_left.appendChild(newDiv);
	// }

}

function onClickCB(ev, inputID){
	console.log(inputID);
	var cb = document.getElementById(inputID);
	bool_arry[cb.id] = cb.checked;
	drawGraph();
	console.log(cb.id, cb.checked);
	console.log("bool is", bool_arry[cb.id])
}

function selectAll(ev){
	var cb = document.getElementById("selectallcheckboxes");
	if(cb.checked){
		var offAllCheckBox = document.getElementById("unselectallcheckboxes");
		offAllCheckBox.checked = false;
		for(var i = 0; i < pills.length; i++){
			var check = document.getElementById(pills[i]);
			check.checked = true;
			bool_arry[check.id] = true;
		}
	}
	drawGraph();
}


function unSelectAll(ev){
	var cb = document.getElementById("unselectallcheckboxes");
	if(cb.checked){
		var allCheckBox = document.getElementById("selectallcheckboxes");
		allCheckBox.checked = false;
		for(var i = 0; i < pills.length; i++){
			var check = document.getElementById(pills[i]);
			check.checked = false;
			bool_arry[check.id] = false;
		}
	}
	drawGraph();
}

isDrawGraphCalled = false;

function drawGraph(){
    if (isDrawGraphCalled) {
        myLineChart.destroy();
    }
  	var ctx = document.getElementById("myChart").getContext("2d");
	var time = [[1,1,1,1,1,1]];
	for(var i = 0; i < pills.length; i++){
		if(bool_arry[pills[i]])
			time.push(pill_time[pills[i]]);
	}

	var datasets = [];
  	for(i = 0; i < time.length; i++){
    	datasets.push(          {
        	    fillColor: "rgba(255,255,255,0)",
            	strokeColor: color[i],
              	pointColor: color[i],
              	pointStrokeColor: "#fff",
              	pointHighlightFill: "#fff",
              	pointHighlightStroke: "rgba(220,220,220,1)",
              	data: time[i]
          })
  	}
  	var data = {
    	labels: ["Mon", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
      	datasets
    };

	myLineChart = new Chart(ctx).Line(data, options);
    isDrawGraphCalled = true;
}


function patientClicked(ev, pillName) {
	toggleActive(ev);
	console.log(pillName);
	drawGraph();
	var cb_left = document.getElementById("checkbox-left");	

	console.log("Children number", cb_left.childNodes.length)

	while(cb_left.childNodes.length > 4)
		cb_left.removeChild(cb_left.childNodes[cb_left.childNodes.length - 1]);
	for(var i = 0; i < pills.length; i++)
		createCheckBoxes(pills[i]);
}


//main()
function main(){
	getPatients();	
}

Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");
main();
