Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

function getPillInfoForPatient() {
  var user = Parse.User.current();
}

function getAllPillInfo() {
  var pillInfo = Parse.Object.extend("PillLib");
  var query = new Parse.Query(pillInfo);
  query.find({
    success: function(results) {

      //alert("Found " + results.length + " results");
      for (var i = 0; i < results.length; i++) {
        var pill = results[i];
        // alert(object.id + " - " + object.get('pillInfo'));
        createPillRecords(pill.get('pillName'), pill.get('pillInfo'), pill.get('pillInstruction'));


      }
    },
    error: function(error) {}
  });
}

function createPillRecords(name, info, instruction) {
  var myDiv = document.getElementById("listWithHandle");
  var nodeName = document.createTextNode("Name: " + name);
  var nodeInfo = document.createTextNode(", info: " + info);
  var nodeInstruction = document.createTextNode(", instruction: " + instruction);
  myDiv.appendChild(nodeName);
  myDiv.appendChild(nodeInfo);
  myDiv.appendChild(nodeInstruction);
}