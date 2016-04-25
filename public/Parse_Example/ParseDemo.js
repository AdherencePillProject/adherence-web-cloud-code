Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

function saveNewData(name, age, approved, registrationDate){
	var demo = new Parse.Object("ParseDemo");
	demo.set("name", name);
	demo.set("age", age);
	demo.set("approved", approved);
	demo.set("registrationDate", registrationDate);
	demo.save(null, {
		success: function(demo){
			alert('New object created with objectId: ' + demo.id);
		},
		error: function(demo, error) {
		    alert('Failed to create new object, with error code: ' + error.message);
  		}
	});
	event.preventDefault();
}

function getDataByName (name) {

	var ParseDemo = Parse.Object.extend("ParseDemo"); 
	var query = new Parse.Query(ParseDemo); 
	
	query.equalTo("name", name); 

	// get all objects with the given name
	query.find({
		success: function(results) {
			alert("Found " + results.length + " results with the given name");

			for (var i = 0; i < results.length; i++) {
      			var object = results[i];
      			alert(object.id + ' - ' + object.get('name'));
  			}
		}, // Be very careful about the comma
		error: function(error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
	});
}

function getDataByUid (uid, data, myDiv) {

	var ParseDemo = Parse.Object.extend("ParseDemo"); 
	var query = new Parse.Query(ParseDemo); 

	query.equalTo("objectId", uid);

	var parseDemo = query.first({
  		success: function(parseDemo) {
  			data["name"] = parseDemo.get("name");
  			data["age"] = parseDemo.get("age");
  			data["approved"] = parseDemo.get("approved");
  			data["registrationDate"] = parseDemo.get("registrationDate");

			var nodeName = document.createTextNode("Name: " + data["name"]);
			var nodeAge = document.createTextNode(", Age: " + data.age);
			var nodeApproved = document.createTextNode(", Approved: " + data.approved);
			var nodeRegistrationDate = document.createTextNode(", Registration Date: " + data.registrationDate);

			myDiv.appendChild(nodeName);
			myDiv.appendChild(nodeAge);
			myDiv.appendChild(nodeApproved);
			myDiv.appendChild(nodeRegistrationDate);
  		},
  		error: function(object, error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
	});

}

function updateUserData(name, age, approved, registrationDate, uid){
	var ParseDemo = Parse.Object.extend("ParseDemo");
	var query = new Parse.Query(ParseDemo);
	query.get(uid, {
		success: function(parseDemo){
			parseDemo.set("name", name);
			parseDemo.set("age", age);
			parseDemo.set("approved", approved);
			parseDemo.set("registrationDate", registrationDate);
			parseDemo.save(null, {
				success: function(demo){
					alert('Object successfully updated: ' + demo.id);
				},
				error: function(demo, error) {
		    		alert('Failed to update object with error code: ' + error.message);
  				}
			});
		},
		error:function(object, error){
			alert("Error: " + error.code + " " + error.message);
		}
	});
}