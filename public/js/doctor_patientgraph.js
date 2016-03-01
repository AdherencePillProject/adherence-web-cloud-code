Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

//namesToIndices = keeps track of which patient is selected
var namesToIndices = {};

/*function searchPatient(patientName) {
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
}*/

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
function createNameDiv(patient_name, count){
	
	//Add their names to div id="patient_names"
	var pn = document.getElementById("patient_names");
	var newA = document.createElement("a");

	newA.href = "#";
	newA.id = "name" + count;
	newA.onclick = function() { toggleActive(this); }
	var name = document.createElement("h4");
	name.textContent = patient_name;
	name.className = "list-group-item-heading";

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
function main() {
	getPatients();
}

main();

//////////////////////////////////////////////
///////// Following is edited by Yeyi/////////
//////////////////////////////////////////////
function clearAllCharts() {
    /*for (var i = 0; i < myLineChart.length; ++i) {
        myLineChart[i].destroy();
    }*/
    myLineChart.destroy();
}
function chooseAllCheckBoxes() {
	var t = document.getElementById("selectallcheckboxes");
    t.checked = true;
    var m1 = document.getElementById("checkbox1");
    m1.checked = true;
    var m2 = document.getElementById("checkbox2");
    m2.checked = true;
}
function patient0(element) {
	clearAllCharts();

	var actives = document.getElementsByClassName("list-group-item active");
	for (var i = 0; i < actives.length; i++){
		actives[i].className = "list-group-item";
	}
	element.className = "list-group-item active";

	myLineChart = new Chart(ctx).Line(data, options);
    chooseAllCheckBoxes();
}

function patient1(element) {
	clearAllCharts();

	var actives = document.getElementsByClassName("list-group-item active");
	for (var i = 0; i < actives.length; i++){
		actives[i].className = "list-group-item";
	}
	element.className = "list-group-item active";

	time = new Array(8, 8.5, 8, 9, 8, 6, 10);
	console.log(time);
	data1 = data;
	/*data1 = {
		labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
		datasets: [
			{
			    label: "Xanax",
			    fillColor: "rgba(255,255,255,0)",
			    strokeColor: "rgba(197, 17, 98,1)",
			    pointColor: "rgba(197, 17, 98,1)",
			    pointStrokeColor: "#fff",
			    pointHighlightFill: "#fff",
			    pointHighlightStroke: "rgba(220,220,220,1)",
			    data: [8, 8.5, 8, 9, 8, 6, 8]
			},
            {
                fillColor: "rgba(255,255,255,0)",
                strokeColor: "rgba(197, 17, 98, 0)",
                pointColor: "rgba(197, 17, 98, 0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [22, 22.5, 21.5, 22, 21, 22, 22]
            }
		]
	};*/
	

	myLineChart = new Chart(ctx).Line(data1, options);

}

function patient2(element) {
	clearAllCharts();

	var actives = document.getElementsByClassName("list-group-item active");
	for (var i = 0; i < actives.length; i++){
		actives[i].className = "list-group-item";
	}
	element.className = "list-group-item active";

	data2 = {
		labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
		datasets: [
			{
			    fillColor: "rgba(255,255,255,0)",
			    strokeColor: "rgba(0, 145, 234,1)",
			    pointColor: "rgba(0, 145, 234,1)",
			    pointStrokeColor: "#fff",
			    pointHighlightFill: "#fff",
			    pointHighlightStroke: "rgba(220,220,220,1)",
			    data: [8, 8.5, 8, 9, 8, 6, 8]
			},
            {
                fillColor: "rgba(255,255,255,0)",
                strokeColor: "rgba(197, 17, 98, 1)",
                pointColor: "rgba(197, 17, 98, 1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [22, 22.5, 21.5, 22, 21, 22, 22]
            }
		]
	};
	chooseAllCheckBoxes();
	myLineChart = new Chart(ctx).Line(data2, options);

}
function selectAll(obj) {
    if (obj.checked == true) {
        var cb1 = document.getElementById("checkbox1");
        var cb2 = document.getElementById("checkbox2");
        var usa = document.getElementById("unselectallcheckboxes");
        usa.checked = false;
        cb1.checked = true;
        checkBox1(obj);
        cb2.checked = true;
        checkBox2(obj);

    }
}
function unSelectAll(obj) {
    var cb1 = document.getElementById("checkbox1");
    var cb2 = document.getElementById("checkbox2");
    var sa = document.getElementById("selectallcheckboxes");
    cb1.checked = false;
    cb2.checked = false;
    sa.checked = false;
    data2 = {
        labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
        datasets: [
            {
                label: "Xanax",
                fillColor: "rgba(255,255,255,0)",
                strokeColor: "rgba(0, 145, 234, 0)",
                pointColor: "rgba(0, 145, 234, 0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [8, 8.5, 8, 9, 8, 6, 8]
            },
            {
                label: "Iron",
                fillColor: "rgba(255,255,255,0)",
                strokeColor: "rgba(197, 17, 98, 0)",
                pointColor: "rgba(197, 17, 98, 0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [22, 22.5, 21.5, 22, 21, 22, 22]
            }
        ]
    };
    clearAllCharts();
    myLineChart = new Chart(ctx).Line(data2, options);
}
function checkBox1(obj) {
	if (document.getElementById("checkbox2").checked == true) {
	    if (obj.checked == false) {
	        data2 = {
	            labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
	            datasets: [
	                {
	                    label: "Xanax",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(0, 145, 234, 0)",
	                    pointColor: "rgba(0, 145, 234, 0)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(220,220,220,1)",
	                    data: [8, 8.5, 8, 9, 8, 6, 8]
	                },
	                {
	                    label: "Iron",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(197, 17, 98, 1)",
	                    pointColor: "rgba(197, 17, 98, 1)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(151,187,205,1)",
	                    data: [22, 22.5, 21.5, 22, 21, 22, 22]
	                }
	            ]
	        };
	        clearAllCharts();
	        myLineChart = new Chart(ctx).Line(data2, options);
	        var selectall = document.getElementById("selectallcheckboxes");
	        selectall.checked = false;
	    }
	    if (obj.checked == true) {
	        data2 = {
	            labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
	            datasets: [
	                {
	                    label: "Xanax",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(0, 145, 234,1)",
	                    pointColor: "rgba(0, 145, 234,1)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(220,220,220,1)",
	                    data: [8, 8.5, 8, 9, 8, 6, 8]
	                },
	                {
	                    label: "Iron",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(197, 17, 98,1)",
	                    pointColor: "rgba(197, 17, 98,1)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(151,187,205,1)",
	                    data: [22, 22.5, 21.5, 22, 21, 22, 22]
	                }
	            ]
	        };
	        clearAllCharts();
	        myLineChart = new Chart(ctx).Line(data2, options);
	    }
	} else {
		if (obj.checked == false) {
	        data2 = {
	            labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
	            datasets: [
	                {
	                    label: "Xanax",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(0, 145, 234, 0)",
	                    pointColor: "rgba(0, 145, 234, 0)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(220,220,220,1)",
	                    data: [8, 8.5, 8, 9, 8, 6, 8]
	                },
	                {
	                    label: "Iron",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(197, 17, 98, 0)",
	                    pointColor: "rgba(197, 17, 98, 0)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(151,187,205,1)",
	                    data: [22, 22.5, 21.5, 22, 21, 22, 22]
	                }
	            ]
	        };
	        clearAllCharts();
	        myLineChart = new Chart(ctx).Line(data2, options);
	        var selectall = document.getElementById("selectallcheckboxes");
	        selectall.checked = false;
	    }
	    if (obj.checked == true) {
	        data2 = {
	            labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
	            datasets: [
	                {
	                    label: "Xanax",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(0, 145, 234,1)",
	                    pointColor: "rgba(0, 145, 234,1)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(220,220,220,1)",
	                    data: [8, 8.5, 8, 9, 8, 6, 8]
	                },
	                {
	                    label: "Iron",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(197, 17, 98,0)",
	                    pointColor: "rgba(197, 17, 98,0)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(151,187,205,1)",
	                    data: [22, 22.5, 21.5, 22, 21, 22, 22]
	                }
	            ]
	        };
	        clearAllCharts();
	        myLineChart = new Chart(ctx).Line(data2, options);
	    }
	}
	document.getElementById("unselectallcheckboxes").checked = false;
}
function checkBox2(obj) {
	if (document.getElementById("checkbox1").checked == true) {
	    if (obj.checked == false) {
	        data2 = {
	            labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
	            datasets: [
	                {
	                    label: "Xanax",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(0, 145, 234, 1)",
	                    pointColor: "rgba(0, 145, 234, 1)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(220,220,220,1)",
	                    data: [8, 8.5, 8, 9, 8, 6, 8]
	                },
	                {
	                    label: "Iron",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(197, 17, 98, 0)",
	                    pointColor: "rgba(197, 17, 98, 0)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(151,187,205,1)",
	                    data: [22, 22.5, 21.5, 22, 21, 22, 22]
	                }
	            ]
	        };
	        clearAllCharts();
	        myLineChart = new Chart(ctx).Line(data2, options);
	        document.getElementById("selectallcheckboxes").checked = false;
	    }
	    if (obj.checked == true) {
	        data2 = {
	            labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
	            datasets: [
	                {
	                    label: "Xanax",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(0, 145, 234,1)",
	                    pointColor: "rgba(0, 145, 234,1)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(220,220,220,1)",
	                    data: [8, 8.5, 8, 9, 8, 6, 8]
	                },
	                {
	                    label: "Iron",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(197, 17, 98,1)",
	                    pointColor: "rgba(197, 17, 98,1)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(151,187,205,1)",
	                    data: [22, 22.5, 21.5, 22, 21, 22, 22]
	                }
	            ]
	        };
	        clearAllCharts();
	        myLineChart[2] = new Chart(ctx).Line(data2, options);
	    }
	} else {
		if (obj.checked == false) {
	        data2 = {
	            labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
	            datasets: [
	                {
	                    label: "Xanax",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(0, 145, 234, 0)",
	                    pointColor: "rgba(0, 145, 234, 0)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(220,220,220,1)",
	                    data: [8, 8.5, 8, 9, 8, 6, 8]
	                },
	                {
	                    label: "Iron",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(197, 17, 98, 0)",
	                    pointColor: "rgba(197, 17, 98, 0)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(151,187,205,1)",
	                    data: [22, 22.5, 21.5, 22, 21, 22, 22]
	                }
	            ]
	        };
	        clearAllCharts();
	        myLineChart = new Chart(ctx).Line(data2, options);
	        document.getElementById("selectallcheckboxes").checked = false;
	    }
	    if (obj.checked == true) {
	        data2 = {
	            labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
	            datasets: [
	                {
	                    label: "Xanax",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(0, 145, 234,0)",
	                    pointColor: "rgba(0, 145, 234,0)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(220,220,220,1)",
	                    data: [8, 8.5, 8, 9, 8, 6, 8]
	                },
	                {
	                    label: "Iron",
	                    fillColor: "rgba(255,255,255,0)",
	                    strokeColor: "rgba(197, 17, 98,1)",
	                    pointColor: "rgba(197, 17, 98,1)",
	                    pointStrokeColor: "#fff",
	                    pointHighlightFill: "#fff",
	                    pointHighlightStroke: "rgba(151,187,205,1)",
	                    data: [22, 22.5, 21.5, 22, 21, 22, 22]
	                }
	            ]
	        };
	        clearAllCharts();
	        myLineChart[2] = new Chart(ctx).Line(data2, options);
	}
}
}