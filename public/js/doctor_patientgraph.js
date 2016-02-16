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
function clearAllCharts() {
    for (var i = 0; i < myLineChart.length; ++i) {
        myLineChart[i].destroy();
    }
}
function patient0(element) {
	clearAllCharts();

	var actives = document.getElementsByClassName("list-group-item active");
	for (var i = 0; i < actives.length; i++){
		actives[i].className = "list-group-item";
	}
	element.className = "list-group-item active";

	myLineChart[0] = new Chart(ctx).Line(data, options);
}

function patient1(element) {
	clearAllCharts();

	var actives = document.getElementsByClassName("list-group-item active");
	for (var i = 0; i < actives.length; i++){
		actives[i].className = "list-group-item";
	}
	element.className = "list-group-item active";

	data1 = {
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
	};

	myLineChart[1] = new Chart(ctx).Line(data1, options);

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
                strokeColor: "rgba(197, 17, 98, 0)",
                pointColor: "rgba(197, 17, 98, 0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [22, 22.5, 21.5, 22, 21, 22, 22]
            }
		]
	};

	myLineChart[2] = new Chart(ctx).Line(data2, options);

}
function selectAll(obj) {
    if (obj.checked == true) {
        var cb1 = document.getElementById("checkbox1");
        var cb2 = document.getElementById("checkbox2");
        cb1.checked = true;
        checkBox1(obj);
        cb2.checked = true;
        checkBox2(obj);

    }
}
function checkBox1(obj) {
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
        myLineChart[2] = new Chart(ctx).Line(data2, options);
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
        myLineChart[2] = new Chart(ctx).Line(data2, options);
    }
}
function checkBox2(obj) {
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
        myLineChart[2] = new Chart(ctx).Line(data2, options);
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
        myLineChart[2] = new Chart(ctx).Line(data2, options);
    }
}