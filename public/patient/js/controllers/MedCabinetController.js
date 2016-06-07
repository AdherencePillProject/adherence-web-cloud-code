angular
    .module('app')
    .controller('MedCabinetController', ['$scope', '$rootScope', 'Patient', function($scope, $rootScope, Patient) {

        console.log("med cabinet controller");

        getPillInfoForCurrentUser();

        Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");
        var counter = 0;

        function getPillInfoForPatient() {
            var user = Parse.User.current();
        }

        function getAllPillInfo() {
            var pillInfo = Parse.Object.extend("PillLib");
            var query = new Parse.Query(pillInfo);
            query.find({
                success: function(results) {
                    alert("Found " + results.length + " results");
                    for (var i = 0; i < results.length; i++) {
                        var pill = results[i];
                        alert(object.id + " - " + object.get('pillInfo'));
                        createPillRecords(pill.get('pillName'), pill.get('pillInfo'), pill.get('pillInstruction'));
                    }
                },
                error: function(error) {}
            });
        }

        function createPillRecords(name, info, instruction) {
            alert("Create Pill Recors called");
            var myDiv = document.getElementById("listWithHandle");
            var nodeName = document.createTextNode("Name: " + name);
            var nodeInfo = document.createTextNode(", info: " + info);
            var nodeInstruction = document.createTextNode(", instruction: " + instruction);
            myDiv.appendChild(nodeName);
            myDiv.appendChild(nodeInfo);
            myDiv.appendChild(nodeInstruction);
        }

        function getPillInfoForCurrentUser() {
            console.log("getpillinfo for current user");
            // Get current user
            var user = Parse.User.current();
            if (user == null) {
                var query = new Parse.Query(Parse.User);
                query.equalTo("username", "wmcalyj");
                query.first({
                    success: function(user) {
                        getPillInfoForUser(user);
                    }
                });
            } else {
                getPillInfoForUser(user);
            }

        }

        function getPillInfoForUser(currentUser) {
            // Get patient pointer
            var patientPointer = currentUser.get("patientPointer");
            patientPointer.fetch({
                success: function(patientPointer) {
                    // After getting current patient pointer, get other information
                    var prescription = Parse.Object.extend("Prescription");
                    var query = new Parse.Query(prescription);
                    query.equalTo("patientID", patientPointer);
                    // Include Bottle info
                    query.include("bottle");
                    // Inlcude Schedule info
                    // query.include("schedule");
                    query.find({
                        success: function(results) {
                            var pillTuple = [];
                            var allPills = [];
                            //Successfully retrieve prescriptions
                            for (var i = 0; i < results.length; i++) {
                                // alert(results[i].get("pillName"));
                                // var pill = [];
                                // pill["name"] = results[i].get("pillName");
                                // allPills.push(pill);
                                // duplicateMedDiv(results[i].get("pillName"));

                                // Get bottle object
                                var bottle = results[i].get("bottle");
                                var relation = bottle.relation('relatedPill');
                                var pillLeft = results[i].get("numberLeft");
                                var pillName = results[i].get("pillName");
                                var consumption = results[i].get("consumptionTime");
                                pillTuple.push(
                                  {pillName: pillName,
                                   pillLeft: pillLeft,
                                   consumption: consumption
                                  });

                                relation.query().find({
                                    success: function(pills) {
                                        // toppings is a list of toppings for this pizza
                                        for (var j = 0; j < pills.length; j++) {
                                            // allPills[i]["instruction"] = pills[j].get("pillInstruction");
                                            var instruction = pills[j].get("pillInstruction");
                                            var name = pills[j].get("pillName");
                                            var info = pills[j].get("pillInfo");
                                            // alert(instruction);
                                            // Use instruction for doctor suggestion for now
                                            // In the future, we may need suggestion column
                                            var pair = findPillLeftForPill(pillTuple, name);
                                            var pillLeft = pair.pillLeft;
                                            var time = pair.time;
                                            duplicateMedDiv(name, instruction, instruction, pillLeft, time);
                                        }
                                    },
                                    error: function(error) {
                                        alert("error: " + error.message);
                                    }
                                });
                            }
                        },
                        error: function(error) {
                            alert("error: " + error.message);
                        }
                    });
                }
            });
        }

        function findPillLeftForPill(pillTuple, name){
          for(var i = 0; i < pillTuple.length; i++){
            if(pillTuple[i].pillName == name){
              return {pillLeft: pillTuple[i].pillLeft, time: pillTuple[i].consumption};
            }
          }
        }

        function duplicateMedDiv(medName, instruction, suggestion, pillLeftNumber, time) {
            // Found pill, hide no pill warning
            $('#noPillFound').attr("style", "display:none");
            var original = document.getElementById('medication');
            var clone = original.cloneNode(true);
            clone.id = "medication" + ++counter;
            clone.style.display = "";
            original.parentNode.appendChild(clone);
            var pillTitle = document.getElementById(clone.id).getElementsByClassName('firstmed')[0];
            pillTitle.id = "medName";
            pillTitle.innerHTML = pillTitle.innerHTML + medName;
            var pillNameAndInstruction = document.getElementById(clone.id).getElementsByClassName('pNameAndInstruction')[0];
            pillNameAndInstruction.innerHTML = pillNameAndInstruction.innerHTML + "Name: " + medName + "<br>" + instruction + "</br>";
            var doctorSuggestion = document.getElementById(clone.id).getElementsByClassName('suggestion')[0];
            doctorSuggestion.innerHTML = doctorSuggestion.innerHTML + suggestion;
            var pillLeft = document.getElementById(clone.id).getElementsByClassName('pillLeft')[0];
            pillLeft.innerHTML = pillLeft.innerHTML + pillLeftNumber;
            var takenTime = document.getElementById(clone.id).getElementsByClassName('takenTime')[0];
            if(time != undefined){
              takenTime.innerHTML = takenTime.innerHTML + time;
            }
            updateNavigation(clone.id, medName);
        }

        function updateNavigation(cloneId, medName) {
            var parent = document.getElementById("myScrollspy");
            var list = document.createElement('li');
            var aHref = document.createElement('a');
            aHref.setAttribute('href', "#" + cloneId);
            aHref.innerHTML = medName;
            list.appendChild(aHref);
            parent.appendChild(list);
        }

    }]);
