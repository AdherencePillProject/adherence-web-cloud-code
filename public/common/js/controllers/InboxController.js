angular.module('app')
  .controller('InboxController', ['$rootScope', '$scope', function($rootScope, $scope) {

    $scope.messages = [];

    function getMessages(folder) {
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
          $scope.$apply(function() {
            $scope.messages = results;
          });
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
      });
    }

    $scope.getReceived = function getInbox() {
      $scope.showTable = false
      getMessages("inbox");
    };

    $scope.getReceived()

    $scope.getSent = function getSent(callback) {
      $scope.showTable = false
      getMessages("sent");
    };

    $scope.send = function send(subject, body, addresseeName) {
      var Message = Parse.Object.extend("Message");
      var sender = $rootScope.currentUser;

      var query = new Parse.Query(Parse.User);
      query.equalTo("username", addresseeName);
      query.first({
        success: function(addressee) {
          var message = new Message();

          message.set("subject", subject);
          message.set("text", body);
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
        },
        error: function(addressee, err) {
          alert("Error: Invalid recipient!");
        }
      });

    };
    // angular.element(document).ready(function () {
    //   getInbox()
    // });


    $scope.update = function(composition) {
        $scope.master = angular.copy(composition);
        console.log($scope.master)
        $scope.send(composition.subject, composition.mailBody, composition.addressee)
      };
  }]);
