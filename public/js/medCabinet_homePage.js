Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

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

function getPillInfoForCurrentUser(){
  // Get current user
  var user = Parse.User.current();
  if(user == null){
    var query = new Parse.Query(Parse.User);
    query.equalTo("username", "wmcalyj");  
    query.first({
      success: function(user) {
        getPillInfoForUser(user);
      }
    });
  }else{
    getPillInfoForUser(user);
  }
  
}

function getPillInfoForUser(currentUser){
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
        query.include("schedule");
        query.find({
          success: function(results){
            //Successfully retrieve prescriptions
            for(var i = 0; i < results.length; i++){
              alert(results[i].get("pillName"));
              // Get bottle object
              var bottle = results[i].get("bottle");
              var relation = bottle.relation('relatedPill');
              relation.query().find({
                success: function(pills) {
                  // toppings is a list of toppings for this pizza
                  for(var j = 0; j < pills.length; j++) {
                    alert(pills[j].get("pillInstruction"));
                  }
                }
              });
            }
          },
          error: function(error){
            alert("error: " + error.message);
          }
        });
    }
  });
}
