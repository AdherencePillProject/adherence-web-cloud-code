angular.module('app')
  .controller('SignupController',
  ['$rootScope', '$scope', 'User', 'UI', '$location', function($rootScope, $scope, User, UI, $location) {


    $scope.register = function() {
      console.log('called')
      if ($scope.password !== $scope.password_confirm) {
        alert('Passwords do not match!');
      }
      var user = {
        email: $scope.email,
        password: $scope.password,
        firstname: $scope.firstname,
        lastname: $scope.lastname,
        gender: $scope.gender
      };

      var additionalInfo = {
        hospitalName: $scope.hospitalName,
        hospitalAddress: $scope.hospitalAddress,
        hospitalCity: $scope.hospitalCity
      };

      saveNewUser(user, $scope.accountType, additionalInfo)
    };

    $scope.reset = function() {
      $scope.$apply(function(){
        $scope.firstname = '';
        $scope.lastname = '';
        $scope.sex = '';
        $scope.phone = '';
        $scope.accountType = '';
        $scope.hospitalName = '';
        $scope.hospitalAddress = '';
        $scope.hospitalCity = '';
        $scope.email = '';
        $scope.password = '';
        $scope.password_confirm = '';
      });
    };

    // Save the new user to Parse
    function saveNewUser(user, accountType, additionalInfo){
    	var newUser = new Parse.User();
    	newUser.set("username", user.email);
    	newUser.set("password", user.password);
    	newUser.set("email", user.email);
    	newUser.set("phone", user.phone);
    	newUser.set("firstname", user.firstname);
    	newUser.set("lastname", user.lastname);
    	newUser.set("gender", user.gender);

      console.log(newUser)
    	var query = new Parse.Query(Parse.User);
        query.equalTo("email", user.email);
        query.first({
        	success: function (foundUser) {
        		if (foundUser) {
    	    		var pp = foundUser.get("patientPointer");
    	        var dp = foundUser.get("doctorPointer");
    	    		if ((pp !== null) && (accountType == "Patient")) {
    	    			alert("There already exists a patient profile registered to this email");
    	    		}
    	    		else if ((dp !== null) && (accountType == "Doctor"))
    	    			alert("There already exists a doctor profile associated with this email");
    	    		else if (accountType == "Doctor" & (dp === null)) {
    	    			var r = confirm("This email already has a patient profile. Would you also like to create a doctor profile for this email?");
    	    			if (r === true) {
    	    				var doctor = new Parse.Object("Doctor");
      						doctor.set("address", additionalInfo.hospitalAddress);
      						doctor.set("hospitalCity", additionalInfo.hospitalCity);
      						doctor.set("hospitalName", additionalInfo.hospitalName);
      						doctor.set("userAccount", foundUser);
      						doctor.save(null, {
      							success: function(doc) {
      									Parse.Cloud.run('saveUserWithNewPointer', { user: foundUser.id, pointer: doc.id, newRole: "Doctor" }, {
      									success: function (s) {
      										alert("user saved, " + s);
      									},
      									error: function (e) {
      										alert("error: " + e.message);
      									}
      								});
      							}
      						});
    	    			}
    	    		}
    	    		else if (accountType == "Patient" & (pp === null)) {
    	    			var r = confirm("This email already has a doctor profile. Would you also like to create a patient profile for this email?");
    	    			if (r === true) {
    	    				var patient = new Parse.Object("Patient");
      						patient.set("userAccount", foundUser);
      						patient.save(null, {
      							success: function(pat) {
      								Parse.Cloud.run('saveUserWithNewPointer', { user: foundUser.id, pointer: pat.id, newRole: "Patient" }, {
      									success: function (s) {
      										alert("user saved, " + s);
      									},
      									error: function (e) {
      										alert("error: " + e.message);
      									}
      								});
      							}
      						});
    	    			}
    	    		}

    	    	}
    	    	else {
    	    		newUser.signUp(user, {
    					success: function(newUser) {
    						setUR(newUser, user, accountType, additionalInfo);
    					},
    					error: function(newUser, error) {
    						alert("Error: " + error.code + " " + error.message);
    					}
    				});

    	    	}
    		},
         error: function(){
           console.log('wtf')
         }
        });

    }


    function setUR(newUser, user, accountType, additionalInfo) {
    	Parse.Cloud.run('setUserRole', { accountType: accountType }, {
    		success: function(role) {
      			alert("The user role has been successfully set to " + accountType);
      			if(accountType.toLowerCase() == "patient"){
    				Parse.Cloud.run('setPatient', { username: newUser.getUsername() }, {
      					success: function(newUser) {
      						alert("The patient is successfully set");
      					},
      					error: function(error) {
      						alert("Failed to set patient " + error.code + " " + error.message);
      					}
    				});
    			}else if(accountType.toLowerCase() == "doctor"){
    				var doctor = new Parse.Object("Doctor");
    				doctor.set("address", additionalInfo.hospitalAddress);
    				doctor.set("hospitalCity", additionalInfo.hospitalCity);
    				doctor.set("hospitalName", additionalInfo.hospitalName);
    				doctor.set("userAccount", newUser);
    				doctor.save(null, {
    					success: function(doc) {
    						newUser.set("doctorPointer", doc);
    						newUser.save();
    					}
    				});

    			}else if(accountType.toLowerCase() == "pharmacy"){
    				newUser.set("userType", ["PharmacyStuff"]);
    			}
    		},
    		error: function(error) {
      			alert("Failed to set user role to " + accountType + " " + error.code + " " + error.message);
      		}
    	});
    	alert("Successfully registered");
    }
  }]);
