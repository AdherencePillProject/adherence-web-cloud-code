//namesToIndices = keeps track of which patient is selected
var namesToIndices = {};

//whether the prescription is part of the same patient or not
var sameDiv = false;

//keeps track of which prescription number we are on
var prescriptionNum = 0;

function randomCSSColor() {
    var color_r = parseInt(Math.random() * 255);
    var color_g = parseInt(Math.random() * 255);
    var color_b = parseInt(Math.random() * 255);
    var colorRGB = "rgba(" + color_r.toString() + ", " + color_g.toString() + ", " + color_b.toString() + ", 1)";
    return colorRGB;
}

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

function getPatientsInfo2() {

  var patientList = Parse.Object.extend("Patient");
  var query = new Parse.Query(patientList);

  // Include user account info so we don't have to do another query
  query.include('userAccount').ascending('firstname');

  // Use a dict to save name/user pairs and sort later
  var unsortedNames = [];

  query.find({
    success: function(patients) {
      for (var i = 0; i < patients.length; i++) {
        var user = patients[i].get("userAccount");

        // In some cases where userAccount is null, we need to double check.
        // Though the userAccount should NOT be null in any cases.
        // But with all the testing data, we never know.

        if (user != undefined) {
          //alert(user);
          var firstname = user.get("firstname");
          var lastname = user.get("lastname");
          if (firstname != undefined && lastname != undefined) {

            var name = firstname + " " + lastname;
            // Use user as the key here because of the bad data sample where multiple
            // different patient accounts are pointing to the same user account which is
            // odd.
            var userAndName = {
              name: name,
              user: user
            };
            unsortedNames.push(userAndName);
            // var name = user["firstname"] + " " + user["lastname"];
            // namesToIndices[i] = user;
            // createNameDiv(name, i);
          }
        }
      }


      // sortedNames.push.apply(sortedNames, Object.keys(unsortedUsers));
      // Ascending, for descending, use sortedNames.sort().reverse()
      // Or, use a customized rule. There is no out-of-box sorting for a nested query.
      unsortedNames.sort(function(a, b) {
        if (a["name"] < b["name"]) {
          return -1;
        }
        if (a["name"] > b["name"]) {
          return 1;
        }

        return 0;
      });
      for (var i = 0; i < unsortedNames.length; i++) {
        var sortedUser = unsortedNames[i]["user"];
        var sortedName = unsortedNames[i]["name"];
        namesToIndices[i] = sortedUser;
        createNameDiv(sortedName, i);
      }
    },
    error: function(error) {
      alert(error.message);
    }
  });
}

//createNameDiv()
//parameters: patient_name, count
//function: creates div for name that shows up on the right

var pills = ["Prilosec", "Cymbalta", "Advil"];

var bool_arry = {};
bool_arry["Prilosec"] = true;
bool_arry["Cymbalta"] = true;
bool_arry["Advil"] = true;

var pill_time = {};
pill_time[pills[0]] = [8,8.5,8,9,8.5,8,8];
pill_time[pills[1]] = [18,18,17.5,18,18.5,18,17.5];
pill_time[pills[2]] = [21,22,21.5,21.5,21,21.5,22];

var presetColors = [
    "rgb(244, 67, 54)", //0.red
    "rgb(233, 30, 99)", //1.pink
    "rgb(156, 39, 176)", //2.purple
    "rgb(103, 58, 183)", //3.deep-purple
    "rgb(63, 81, 181)", //4.indigo
    "rgb(33, 150, 243)", //5.blue
    "rgb(3, 169, 244)", //6.light-blue
    "rgb(0, 188, 212)", //7.cyan
    "rgb(0, 150, 136)", //8.teal
    "rgb(76, 175, 80)", //9.green
    "rgb(139, 195, 74)", //10.light-green
    "rgb(205, 220, 57)", //11.lime
    "rgb(255, 235, 59)", //12.yellow
    "rgb(255, 193, 7)", //13.amber
    "rgb(255, 152, 0)", //14.orange
    "rgb(255, 87, 34)", //15.deep-orange
    "rgb(121, 85, 72)", //16.brown
    "rgb(96, 125, 139)", //17.blue-grey
    "rgb(117, 117, 117)", //18.grey darken-1
    ]
var pillLabelColor = [];
for (var i = 0; i < pills.length; i++) {
    pillLabelColor[pills[i]] = presetColors[i];
}
// pillLabelColor[pills[0]] = "rgb(0, 145, 234)";
// pillLabelColor[pills[1]] = "rgba(197, 17, 98,1)";
// pillLabelColor[pills[2]] = "rgba(205, 220, 57, 1)";



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
function createCheckBoxes (pillName, pillColor) {
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
        cblabel.style="color: " + pillColor + ";";
        // cblabel.style = "color: " + randomCSSColor() + ";";

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
    document.getElementById("unselectallcheckboxes").checked = false;
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

var isDrawGraphCalled = false;

function drawGraph(){
    if (isDrawGraphCalled) {
        myLineChart.destroy();
    }
  	var ctx = document.getElementById("myChart").getContext("2d");
	var time = [];
    var _color = [];
	for(var i = 0; i < pills.length; i++){
		if(bool_arry[pills[i]]) {
			time.push(pill_time[pills[i]]);
            _color.push(pillLabelColor[pills[i]]);
        }
	}

	var datasets = [];
  	for(i = 0; i < time.length; i++){
    	datasets.push(          {
        	    fillColor: "rgba(255,255,255,0)",
            	strokeColor: _color[i],
              	pointColor: _color[i],
              	pointStrokeColor: "#fff",
              	pointHighlightFill: "#fff",
              	pointHighlightStroke: "rgba(220,220,220,1)",
              	data: time[i]
          })
  	}
  	var data = {
    	labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
      	datasets
    };

	myLineChart = new Chart(ctx).Line(data, options);
    isDrawGraphCalled = true;
}


function patientClicked(ev, pillName) {
	toggleActive(ev);
	console.log(pillName);
	drawGraph();

    document.getElementById("selectallcheckboxes").checked = true;

	var cb_left = document.getElementById("checkbox-left");

	console.log("Children number", cb_left.childNodes.length)

	while(cb_left.childNodes.length > 4)
		cb_left.removeChild(cb_left.childNodes[cb_left.childNodes.length - 1]);
	for(var i = 0; i < pills.length; i++)
		createCheckBoxes(pills[i], pillLabelColor[pills[i]]);
}


//main()
function main(){
	getPatientsInfo2();
}

Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");
main();
