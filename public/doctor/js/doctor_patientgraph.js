angular.module('app')
.controller('patient_graphCtrl', function($scope) {
    console.log('entered controller');

    //window.onload = function () {
    //namesToIndices = keeps track of which patient is selected

    var namesToIndices = {};

    //whether the prescription is part of the same patient or not
    var sameDiv = false;

    //keeps track of which prescription number we are on
    var prescriptionNum = 0;

    var days = 7;

    var Perscription = new Parse.Object.extend("Perscription", {
        Name: "",
        Pill_Data: [],
        Pill_Names: [],
    });

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

                    if (user != undefined) {
                        var firstname = user.get("firstname");
                        var lastname = user.get("lastname");
                        if (firstname != undefined && lastname != undefined) {
                            var name = firstname + " " + lastname;
                            var userAndName = {
                                lastName: lastname,
                                name: name,
                                user: user
                            };
                            unsortedNames.push(userAndName);
                        }
                    }
                }
                // sortedNames.push.apply(sortedNames, Object.keys(unsortedUsers));
                // Ascending, for descending, use sortedNames.sort().reverse()
                // Or, use a customized rule. There is no out-of-box sorting for a nested query.
                unsortedNames.sort(function(a, b) {
                    if (a['lastName'] < b['lastName']) return -1;
                    if (a['lastName'] > b['lastName']) return 1;
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


    function patientClicked(ev, pillName) {
      toggleActive(ev);
      chart.options.data = [];
      chart.options.title.text = pillName + "'s Weekly Graph Report";
      pill_times_data = [];


      // var perscription = Parse.Object.extend("Perscription");
      var query = new Parse.Query(Perscription);

      // alert(pillName)
      query.equalTo("Name", pillName);
      query.find({
        success:function(result){
            for (var i = 0; i < result.length; i++){
                PillData = result[i].get("Pill_Data");
                pill_names = result[i].get("Pill_Names");
            }
            createDataArray(PillData, pill_times_data)
            putDataArrayToChart();
            // getPatientsInfo2();
            chart.render();
        },
        error: function(error) {
            alert("error: " + error.code + " " + error.message)
        }
      })
      $(".col-md-8 > .btn-group").show();
    }


    CanvasJS.addColorSet("customColorSet", [
        "#ffc107", //amber
        "#f44336", //red
        "#cddc39", //lime
        "#3f51b5", //indigo
        "#2196f3", //blue
        "#4caf50", //green
        "#e91e63", //pink
        "#00bcd4", //cyan
        "#9c27b0", //purple
        "#673ab7", //deep-purple
        "#03a9f4", //light-blue
        "#009688", //teal
        "#8bc34a", //light-green
        "#ffeb3b", //yellow
        "#ff9800", //orange
        "#ff5722", //deep-orange
        "#795548", //brown
        "#607d8b", //blue-grey
        "#757575", //grey darken-1
    ]);
    var chart = new CanvasJS.Chart("chartContainer", {
        colorSet: "customColorSet",
        animationEnabled: true,
        title:{
            text: "Weekly Graph Report",
            horizontalAlign: "center"
        },
        toolTip:{
            shared: false,
            contentFormatter: function(e) {
                var yValue = e.entries[0].dataPoint.y;
                var hours = parseInt(yValue);
                var floatPart = yValue - hours;
                var minutes = (Array(2).join('0') + floatPart * 60).slice(-2);
                return e.entries[0].dataSeries.name + " " + hours + ":" + minutes;
            }
        },
        legend: {
            verticalAlign: "center",
            horizontalAlign: "right",
            fontSize: 10,
            fontFamily: "Lucida Sans Unicode"
        },
        axisX: {
            valueFormatString: "MMM DD"
        },
        axisY: {
            minimum: 0,
            maximum: 24,
            interval: 2,
            suffix:":00",
            interlacedColor: "#eceff1",
            gridThickness: 1,
            gridColor: "rgba(204,204,204,0.7)",
            gridDashType: "dash"
        },
        data: [],
        legend: {
            cursor:"pointer",
            itemclick : function(e) {
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                chart.render();
            }
        }
    });

    chart.render();

    var pill_times_data = [];
    var pill_time_dataPoints = [];
    var pill_names = []; // ["Prilosec", "Cymbalta", "Advil"];


    var PillData = [];



    function createDataArray(PillData, drawArray){
      console.log("function called")
      for(var i = 0; i < PillData.length; i++){
        var chartData = []
        for(var j = 0; j < PillData[i].length; j++){
          if(PillData[i][j]["time"] == null){
            chartData.push({x:PillData[i][j]["date"], y:null})
          }
          else if(PillData[i][j]["number"] == false){
            chartData.push({x:PillData[i][j]["date"], y:PillData[i][j]["time"],
                           markerType:"cross", markerBorderThickness: 10, markerSize: 12})
          }
          else{
            chartData.push({x:PillData[i][j]["date"], y:PillData[i][j]["time"]})
          }
        }
        drawArray.push(chartData)
      }
    }

    function putDataArrayToChart() {
      console.log(pill_times_data.length)
        for (var i = 0; i < pill_names.length; i++) {
            var pill_time = {
                type: "line",
                name: pill_names[i],
                axisYType: "primary",
                showInLegend: true,
                lineThickness: 4,
                markerType: "circle",
                markerSize: 12,
                dataPoints: pill_times_data[i].slice(pill_times_data[i].length - days, pill_times_data[i].length),
                visible:true
            }
            chart.options.data.push(pill_time);
        }
    }
        $("#addDataPoint").click(function () {

        var length = chart.options.data[0].dataPoints.length;
        chart.options.title.text = "New DataPoint Added at the end";
        chart.options.data[0].dataPoints.push({ y: 25 - Math.random() * 10});
        chart.render();

        });

    $("#week-view").click(function() {
        days = 7;
        chart.options.data = [];
        createDataArray(PillData, pill_times_data);
        putDataArrayToChart();
        chart.render();
        $("#view-text").text("Week");
        //$(".btn-group dropup > .btn btn-default dropdown-toggle").html("???");
    });

    $("#month-view").click(function() {
        days = 14
        chart.options.data = []
        createDataArray(PillData, pill_times_data)
        putDataArrayToChart();
        chart.render();
        $("#view-text").text("Month");
    });



    // createDataArray(PillData, pill_times_data)
    // putDataArrayToChart();
    getPatientsInfo2();
    // chart.render();

    $("#SelectAll").click(function() {
      for(var i = 0; i < pill_names.length; i++) {
        chart.options.data[i].visible = true;
      }
      chart.render();
    });

    $("#unSelectAll").click(function() {
      for(var i = 0; i < pill_names.length; i++) {
        chart.options.data[i].visible = false;
      }
      chart.render();
    });


    $(".canvasjs-chart-credit").hide();
    $(".col-md-8 > .btn-group").hide();

    // for Modal(Customize view)
    $("#modal-confirm").click(function() {
        //var t = document.getElementById("date-from");
        $from = $("#date-from").prop("value"); // a string in the form of: 2015-05-21
        $to = $("#date-to").prop("value");
        $fromYear = parseInt($from.slice(0, 4));
        $fromMonth = parseInt($from.slice(5, 7)) - 1;
        $fromDay = parseInt($from.slice(8, 10));
        $toYear = parseInt($to.slice(0, 4));
        $toMonth = parseInt($to.slice(5, 7)) - 1;
        $toDay = parseInt($to.slice(8, 10));

        var customizeData = [
            [
                {date: new Date($fromYear, $fromMonth, $fromDay), time: 21, number: true},
                {date: new Date($fromYear, $fromMonth, $fromDay + 1), time: 22, number: true},
                {date: new Date($toYear, $toMonth, $toDay), time: 22, number: true}
            ],
            [
                {date: new Date($fromYear, $fromMonth, $fromDay), time: 2, number: true},
                {date: new Date($fromYear, $fromMonth, $fromDay + 1), time: 3, number: true},
                {date: new Date($toYear, $toMonth, $toDay), time: 4, number: true}
            ],
            [
                {date: new Date($fromYear, $fromMonth, $fromDay), time: 6, number: true},
                {date: new Date($fromYear, $fromMonth, $fromDay + 1), time: 6, number: true},
                {date: new Date($toYear, $toMonth, $toDay), time: 7, number: true}
            ]
        ];
        
        chart.options.data = [];
        var pill_times_data_temp = []
        for(var i = 0; i < customizeData.length; i++) {
            var chartData = []
            for(var j = 0; j < customizeData[i].length; j++) {
                chartData.push({x:customizeData[i][j]["date"], y:customizeData[i][j]["time"]});
            }
            pill_times_data_temp.push(chartData);
        }
            
        for (var i = 0; i < pill_names.length; i++) {
            var pill_time = {
                type: "line",
                name: pill_names[i],
                axisYType: "primary",
                showInLegend: true,
                lineThickness: 4,
                markerType: "circle",
                markerSize: 12,
                dataPoints: pill_times_data_temp[i],
                visible:true
            }
            chart.options.data.push(pill_time);
        }
        
        chart.render();
        $("#view-text").text("Customize");
    });


   // }


    //Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

});
