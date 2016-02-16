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

//////////////////////////////////////////////
///////// Following is edited by Yeyi/////////
//////////////////////////////////////////////
function patient0(element) {
	for (var i = 0; i < myLineChart.length; ++i) {
		myLineChart[i].destroy();
	}
	var actives = document.getElementsByClassName("list-group-item active");
	for (var i = 0; i < actives.length; i++){
		actives[i].className = "list-group-item";
	}
	element.className = "list-group-item active";

	var data0 = {
		labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
		datasets: [
			{
			    fillColor: "rgba(220,220,220,0.2)",
		        strokeColor: "rgba(220,220,220,1)",
		        pointColor: "rgba(220,220,220,1)",
		        pointStrokeColor: "#fff",
		        pointHighlightFill: "#fff",
		        pointHighlightStroke: "rgba(220,220,220,1)",
		        data: [8, 1, 0, 0, 0, 0, 1]
			},
			{
		        label: "Iron",
		        fillColor: "rgba(151,187,205,0.2)",
		        strokeColor: "rgba(151,187,205,1)",
		        pointColor: "rgba(151,187,205,1)",
		        pointStrokeColor: "#fff",
		        pointHighlightFill: "#fff",
		        pointHighlightStroke: "rgba(151,187,205,1)",
		        data: [0, 0, 0, 0, 0, 2, 0]
		    }
		]		
	};
	myLineChart[0] = new Chart(ctx).Line(data0, options);
}

function patient1(element) {
	for (var i = 0; i < myLineChart.length; ++i) {
		myLineChart[i].destroy();
	}
	var actives = document.getElementsByClassName("list-group-item active");
	for (var i = 0; i < actives.length; i++){
		actives[i].className = "list-group-item";
	}
	element.className = "list-group-item active";
	var data1 = {
		labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
		datasets: [
			{
			    label: "Xanax",
			    fillColor: "rgba(220,220,220,0.2)",
			    strokeColor: "rgba(220,220,220,1)",
			    pointColor: "rgba(220,220,220,1)",
			    pointStrokeColor: "#fff",
			    pointHighlightFill: "#fff",
			    pointHighlightStroke: "rgba(220,220,220,1)",
			    data: [1, 1, 0, 0, 0, 0,0]
			}
		]
	};

		myLineChart[1] = new Chart(ctx).Line(data1, options);
	}

function patient2(element) {
	for (var i = 0; i < myLineChart.length; ++i) {
		myLineChart[i].destroy();
	}
	var actives = document.getElementsByClassName("list-group-item active");
	for (var i = 0; i < actives.length; i++){
		actives[i].className = "list-group-item";
	}
	element.className = "list-group-item active";

	var data2 = {
		labels: ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"],
		datasets: [
			{
			    label: "Xanax",
			    fillColor: "rgba(220,220,220,0.2)",
			    strokeColor: "rgba(220,220,220,1)",
			    pointColor: "rgba(220,220,220,1)",
			    pointStrokeColor: "#fff",
			    pointHighlightFill: "#fff",
			    pointHighlightStroke: "rgba(220,220,220,1)",
			    data: [1, 1, 0, 0, 0, 0,0]
			}
		]
	};

		myLineChart[2] = new Chart(ctx).Line(data2, options);
	}