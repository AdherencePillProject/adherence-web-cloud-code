angular.module('app')
  .controller('LoginController', ['$rootScope', '$scope', '$rootScope', 'User', 'UI', function($rootScope, $scope, $rootScope, User, UI) {

    $scope.login = login;

    function login(username, password, url) {
    	User.logIn(username, password, {
    		success: function(user) {
          if (user) {
              $rootScope.currentUser = Parse.User.current();
              var pp = user.get("patientPointer");
              var dp = user.get("doctorPointer");
              if ((form.Account_type.value == "Patient") & (pp != null))
                userAuthenticate(form.account.value, form.password.value, "/profile/patient");
              else if ((form.Account_type.value == "Doctor") & (dp != null))
                userAuthenticate(form.account.value, form.password.value, "Doctor_homepage/Doctorhome.html");
              else
                alert("You're attempting to log in as someone you are not");
          }
          else {
              var sUp = confirm("This email was not found in our database. Would you like to sign up?");
              if (sUp == true) window.location.replace("signup.html");
          }
    			alert("You have successfully logged in!");
    			UI.redirect(url);
    		},
    		error: function(user, error) {
    			alert("Invalid username/password combination" + error.code + " " + error.message);
    		}
    	});
    }

  }]);
