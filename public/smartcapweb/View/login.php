<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
session_start();
$_SESSION['accountID'] = $_SESSION["accountID"];
$_SESSION['type'] = $_SESSION["type"];
;
$_SESSION['password'] = $_SESSION["password"];
?>
<!--This file is new index for new interface and ajax-->
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Smartcap Homepage</title>
        <style type="text/css">
            body {
                background: #7fbbdb ;
            }
            #bottelbody {
                border: 2px solid #a1a1a1;
                background: #ffffff;
                width: 300px;
                border-bottom-right-radius:25px;
                border-bottom-left-radius:25px;
                box-shadow: 10px 10px 5px #708090;
                position: absolute;
                left: 253px;
                top: 195px;
                width: 310px;
                height: 320px;
                z-index: 1;
                font-family: Verdana, Geneva, sans-serif;
                font-weight: bold;
                color: #000000;
                outline: none;
                text-decoration: none !important;
                -webkit-transition: all 100ms linear;
                transition: all 100ms linear;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                cursor: pointer;

                text-align: left;

                color: #ffffff;
                background: -webkit-linear-gradient(top, #6fbdbf 0%, #92cdcf 100%);
                background: linear-gradient(to bottom, #6fbdbf 0%, #92cdcf 100%);
                border: 1px solid #5db5b8;
                box-shadow: 0px 4px 0px 0px #5db5b8, 0px 5px 12px 0px rgba(0, 0, 0, 0.6), inset 0px 0px 10px -5px #000000;
            }
            #bottellid {
                border: 2px solid #a1a1a1;
                background: #ffffff;
                width: 300px;
                border-radius: 25px;
                box-shadow: 10px 10px 5px #708090;
                position: absolute;
                left: 199px;
                top: 75px;
                width: 410px;
                height: 112px;
                z-index: 2;
                font-family: "MS Serif", "New York", serif;
                color: #000;


                outline: none;
                text-decoration: none !important;


                -webkit-transition: all 100ms linear;
                transition: all 100ms linear;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                cursor: pointer;

                text-align: center;

                color: #ffffff;
                background: -webkit-linear-gradient(top, #6fbdbf 0%, #92cdcf 100%);
                background: linear-gradient(to bottom, #6fbdbf 0%, #92cdcf 100%);
                border: 1px solid #5db5b8;
                box-shadow: 0px 4px 0px 0px #5db5b8, 0px 5px 12px 0px rgba(0, 0, 0, 0.6), inset 0px 0px 10px -5px #000000;

                text-align: center;
            }

            .formpart {
                margin-top: 30px;
                margin-bottom: 20px;
                margin-right: 20px;
                margin-left: 20px;    
                padding-top: 25px;
                padding-bottom: 25px;

            }

            .button {
                float: right;
                width: 70px;
                height: 70px;
                border-radius: 80px;
                margin-top: 10px;
                margin-bottom: 10px;
                margin-right: 15px;
                margin-left: 15px;    
                padding-top: 5px;
                padding-bottom: 5px;
                -webkit-box-shadow: inset -2px -3px 18px #d2b48c, inset 1px -5px 10px #888, inset 0 10px 8px 2px #FFFFFF;


                outline: none;
                text-decoration: none !important;


                -webkit-transition: all 100ms linear;
                transition: all 100ms linear;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                cursor: pointer;

                text-align: center;

                color: #ffffff;
                background: -webkit-linear-gradient(top, #6fbdbf 0%, #92cdcf 100%);
                background: linear-gradient(to bottom, #6fbdbf 0%, #92cdcf 100%);
                border: 1px solid #5db5b8;
                box-shadow: 0px 4px 0px 0px #5db5b8, 0px 5px 12px 0px rgba(0, 0, 0, 0.6), inset 0px 0px 10px -5px #000000;
            }
            .button:hover
            {
                background: -webkit-linear-gradient(top, #a8e427 0%, #b1e73d 100%);
                background: linear-gradient(to bottom, #a8e427 0%, #b1e73d 100%);
            }
            .button:hover:active
            {
                border: none !important;
                top: 4px;
                box-shadow: 0px 2px 0px 0px #9bd71a, 0px 5px 12px 0px rgba(0, 0, 0, 0.6), inset 0px 0px 10px -5px #000000;
            }

            .AccountType:hover
            {
                background: -webkit-linear-gradient(top, #a8e427 0%, #b1e73d 100%);
                background: linear-gradient(to bottom, #a8e427 0%, #b1e73d 100%);
            }
        </style>

    </head>

    <body class="passwordValidMsg">
        <div id="bottellid"><a href="login.php"><img src="images/logonew.jpg" ></a></div>
        <div id="bottelbody">
            <div class="formpart">
                <form id="form1" name="form1" method="post" action="../Controllers/LoginController.php"> 
                    <p>Account Type:
                        <select name="Account_type" id="AccountType">
                            <option>Patient</option>
                            <option>Doctor</option>
                            <option>Pharmacy</option>
                        </select>
                        <label for="AccountType"></label>
                    </p>
                    <p>Account ID:
                        <input type="text" name="account" id="AccountID" />
                    </p>
                    <p>Password: 
                        <input type="password" name="password" id="Password" />
                        <label for="Password"></label>
                        <label for="AccountID"></label>
                    </p>

                    <p>
                        <a href="SignUp.php">
                            <input name="Signup" type="button" class="button" value="Signup" /></a>
                        <input type="submit" name="Login" class="button" id="login" value="Log In" />

                    </p>

                </form>
                <!--div id="tip"></div>-->
            </div>
        </div>
        <!-- Submit form and getting redirected will be done through LoginControoler -->
        <!--
        <script type="text/javascript">

            function createXmlHttp() {

                var xmlHttp = null;
                try {
                    //Firefox, Opera 8.0+, Safari
                    xmlHttp = new XMLHttpRequest();
                } catch (e) {
                    //IE
                    try {
                        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (e) {
                        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                }
                return xmlHttp;
            }
            function submitForm() {
                var xmlHttp = createXmlHttp();
                var accountstate;
                if (!xmlHttp) {
                    alert("not support AJAX!");
                    return 0;
                }
                if (document.getElementById('AccountID').value == "" || document.getElementById('Password').value == "") {
                    if (document.getElementById('AccountID').value == "") {
                        alert('Please Enter Your Account ID!');
                    }
                    if (document.getElementById('Password').value == "") {
                        alert('Please Enter Your Password!');
                    }
                }
                else {
                    var TypeObj = document.getElementById("AccountType");
                    accounttype = TypeObj.options[TypeObj.selectedIndex].value
                    var url = "/SmartCapWeb-V2.0/IndexResponse.php";
                    var postData = "";
                    postData = "accountID=" + document.getElementById('AccountID').value;
                    postData += "&type=" + accounttype;
                    postData += "&password=" + document.getElementById('Password').value;
                    xmlHttp.open("POST", url, true);
                    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xmlHttp.onreadystatechange = function () {
                        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                            if (xmlHttp.responseText != null) {
                                accountstate = xmlHttp.responseText; //the response from the process part can just access within the 
                                //this line is for test the value from xmlHttp.responseText
                                //document.getElementById('tip').innerHTML = accountstate;

                                //this is test for the type of xmlHttp.responseText
                                //alert(accountstate);
                                //var newString = new String ();                        
                                if (accountstate.replace(/(^\s*)|(\s*$)/g, "").indexOf("valid") > -1) {//string.replace(/(^\s*)|(\s*$)/g, "") to remove special character
                                    alert("welcome!");
                                    switch (accounttype) {
                                        case "Patient":
                                            window.location.replace("personalView.php");
                                            break;
                                        case "Doctor":
                                            window.location.replace("Doctor.php");
                                            break;
                                        case "Pharmacy":
                                            top.location = 'newIndex.php';
                                            break;
                                        default:
                                            top.location = 'newIndex.php';
                                    }
                                }
                                else {
                                    alert(accountstate);
                                    top.location = 'newIndex.php';
                                }
                                //this is to test the format of xmlHttp.responsetext
                                //var alertt = "!" + accountstate.replace(/(^\s*)|(\s*$)/g, "") + "!";
                                //alert(alertt);
                            }
                        }
                    }
                    xmlHttp.send(postData);
                }
            }
        </script>
        </script>-->
    </body>
</html>

