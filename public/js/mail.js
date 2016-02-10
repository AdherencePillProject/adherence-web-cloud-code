Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

// arguments: two strings (subject and a message) and a user object (addressee)
// purpose: sends a message!
function send(subject, msg, addressee) {

	var message = new Parse.Object("Message");
	var sender = Parse.User.current();

	message.set("subject", subject);
	message.set("text", msg);
	message.set("sender", sender);
	message.set("addressee", addressee);
	message.save({
		success: function (obj) {
			
		},

		error: function (obj, error) {
			alert("Error: " + error.code + " " + error.message);	
		}
	})
};


function getInbox(fn) {
	getMessages("inbox", fn);
}

function getSent(fn) {
	getMessages("sent",fn);
}

// gets the array of sent msgs/inbox for the current user depending on folder argument
// and passes it to fn callback
function getMessages(folder, fn) {

	var message = Parse.Object.extend("Message"); 
	var query = new Parse.Query(message); 
	
	if (folder == "inbox")
		query.equalTo("addressee", Parse.User.current()); 
	else if (folder == "sent")
		query.equalTo("sender", Parse.User.current());
	else 
		error("No Such Folder");

	var q = query.find({
		success: function(results) {
			fn(results);
		}, 
		error: function(error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
	});

}