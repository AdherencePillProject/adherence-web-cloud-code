angular.module('app')
  .controller('InboxController', ['$rootScope', '$scope', function($rootScope, $scope) {

    function getMessages(folder, fn) {
    	var message = Parse.Object.extend("Message");
    	var query = new Parse.Query(message);

    	if (folder == "inbox")
    		query.equalTo("addressee", Parse.User.current());
    	else if (folder == "sent")
    		query.equalTo("sender", Parse.User.current());
    	else
    		throw new Error("No Such Folder");

    	query.include("sender");
    	query.include("addressee");
    	query.find({
    		success: function(results) {
    			fn(results);
    		},
    		error: function(error) {
        		alert("Error: " + error.code + " " + error.message);
      		}
    	});

    }

    function getInbox(fn) {
    	getMessages("inbox", fn);
    }

    function getSent(fn) {
    	getMessages("sent",fn);
    }

    $scope.send = function(subject, message, addressee) {

      var sender = $rootScope.currentUser;

      message.set("subject", subject);
      message.set("text", msg);
      message.set("sender", sender);
      message.set("addressee", addressee);
      message.save({
        success: function (obj) {
          alert('success!');
        },

        error: function (obj, error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    };



  }]);
