<!DOCTYPE html>
<html lang="en">
<head>
<title>Smartcap Homepage</title>
<link rel="stylesheet" href="css/reset.css" type="text/css" media="all">
<link rel="stylesheet" href="css/layout.css" type="text/css" media="all">


<script type="text/javascript" src="js/jquery-1.6.js"></script>
<script type="text/javascript" src="js/cufon-yui.js"></script>
<script type="text/javascript" src="js/cufon-replace.js"></script> 
<script type="text/javascript" src="js/Vegur_700.font.js"></script>
<script type="text/javascript" src="js/Vegur_400.font.js"></script>
<script type="text/javascript" src="js/Vegur_300.font.js"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/tms-0.3.js"></script>
<script type="text/javascript" src="js/tms_presets.js"></script>
<script type="text/javascript" src="js/backgroundPosition.js"></script>
<script type="text/javascript" src="js/atooltip.jquery.js"></script>
<script type="text/javascript" src="js/script.js"></script>
</head>

<body id="page1">
<div class="body1">
	<div class="main">
    <!-- Part1: header -->
		<header>
			<div class="wrapper">
			  	<!--<h1><a href="index.html" id="logo">SmartCap</a></h1>--><!--logo delete-->
			  	<h1><a href="index.php" id="top_logo"><span>Smart</span>Cap</a>
				  <!--nav>
				  	
					  <ul id="top_nav">
						<!--log in part goes here>
						
						    <li><a href="#">Account<span id="sprytextfield1">
                    <input name="account" type="text" id="account" placeholder="account" style="border-radius:3px; border-color:#ffffff;">
                    <span class="textfieldRequiredMsg"></span>
                    </span>
                    </a>      
                </li>
                <li><a href="#">Password<span id="sprypassword1">
                    <input name="password" type="password" id="account" value="password" style="border-radius:3px;border-color:#ffffff;">
                    <span class="passwordRequiredMsg"></span>
                    </span>
                    </a>        
                </li>
                <li>
                    <a href="individul_cal.html"><button class="buttons"  type=input id="log_in">Log in</button></a>
                    <a href="#"><button class="buttons"  type=input id="Sign_up">Sign Up</button></a>
                </li>
            <!--log in part end here>
					  </ul>
				  </nav-->
			 </h1>
			 <!--navagation goes here-->
			 <nav>
					<ul id="menu">
						<li id="menu_active"><a href="index.php">Home</a></li>
						<li><a href="Mission.html">Our Mission</a></li>
						<li><a href="News.html">News &amp; Press</a></li>
						<li><a href="Help.html">Information</a></li>
						<li><a href="Contact.html">Contact</a></li>
					</ul>
				</nav>
		</div> <!--div for wrapper-->
		

		</header>
<!-- / header -->


<!--register content-->
<div class="register_info">
<div align="center" id="retitle"><span align="center">Register </span><div> 
<div align="center"> 
<form name="reg" action="user_add.jsp" method="post" target="_self" onSubmit="return docheck()"> 
<table width="90%" border="0"> 
<tr> 
<td width="50%" align="right" height="25"><font face="Arial, Helvetica, sans-serif">User Name:  </font></td> 
<td id="inputx" width="50%" align="left" height="25"> 
 <input type="text" name="UserName"> <span>*</span>
<br> 
<font color="red"> Here is restrict description of user name </font> 
</td> 
</tr> 
<tr> 
<td width="50%" align="right" height="25" >Patient ID:  </td> 
<td width="50%" align="left" height="25"> <input type="text" name="PID" class="inputbox" onfocus="myFunction(this)"></td> <span><img src="images/waiting_loading.gif" alt=""></span>
</tr> 
<tr> 
<td width="50%" align="right" height="25">Password:  </td> 
<td width="50%" align="left" height="25"> <input type="password" name="UserPassword"></td> 
</tr> 
<tr> 
<td width="50%" align="right" height="25">Confirm Password:  </td> 
<td width="50%" align="left" height="25"> <input type="password" name="CUserPassword"></td> 
</tr> 
<tr> 
<td width="50%" align="right" height="25">Gender:  </td> 
<td width="50%" align="left" height="25"> <input type="radio" name="Sex" value="0" checked>Male <input type="radio" name="Sex" value="1">Female</td> 
</tr> 
<tr> 
<td width="50%" align="right" height="25">E-mail:  </td> 
<td width="50%" align="left" height="25"> <input type="text" name="Email"></td> 
</tr> 
</table> 
<p> 
<input type="submit" name="sub" value="Submit">     
<input type="reset" name="res" value="Clear"> 
</p> 
</form> 

    <!--new 9.4-->

    <?php
        /*CONNECTED TO DATABASE*/

 $db = pg_connect("host=127.0.0.1 port=5432 dbname=SmartCap21 user=postgres password=root");
   //$db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db){
      echo "Error : Unable to open database\n";
   } else {
      echo "Opened database successfully\n";
   }
   echo "<br>";


 /*GET THE VALUE FROM FORM POSTED*/
// define variables and set to empty values
$nameErr = $emailErr = $genderErr = $PasswordErr =$confirmErr=$IDErr=$addressErr = "";
$name = $email = $gender = $ID = $password =$confirm=$address = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
 //name post  
   if (empty($_POST["name"])) {
     $nameErr = "Name is required";
   } else {
     $name = test_input($_POST["name"]);
     // check if name only contains letters and whitespace
     if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
       $nameErr = "Only letters and white space allowed"; 
     }
   }

//ID post  
   if (empty($_POST["ID"])) {
     $IDErr = "ID is required";
   } else {
     $ID = test_input($_POST["ID"]);
     // check if name only contains numbers,add other restriction here
     if (!preg_match("/^[0-9]*$/",$ID)) {
       $IDErr = "Only numbers are allowed"; 
     }
   }

   //pssword post  
   if (empty($_POST["password"])) {
     $PasswordErr = "Password is required";
   } else {
     $password = test_input($_POST["password"]);
     // check if name only contains numbers,add other restriction here
     if (!preg_match("/^[0-9a-zA-Z]*$/",$password)) {
       $PasswordErr = "Only numbers and letters are allowed"; 
     }
   }
   
   //pssword CONFIRM post  
   if (empty($_POST["confirm"])) {
     $confirmErr = "Please confirm your password";
   } else {
     $confirm = test_input($_POST["confirm"]);
     // check if name only contains numbers,add other restriction here
     if ($confirm != $password) {
       $confirmErr = "Not match the password"; 
     }
   }

//phone number post and check
   if (empty($_POST["phone"])) {
     $phoneErr = "Email is required";
   } else {
     $phone = test_input($_POST["phone"]);
  
     }
   
//email post and check
   if (empty($_POST["email"])) {
     $emailErr = "Email is required";
   } else {
     $email = test_input($_POST["email"]);
     // check if e-mail address is well-formed
     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
       $emailErr = "Invalid email format"; 
     }
   }
     
 //address post
   if (empty($_POST["address"])) {
     $addressErr = "Address is required";
   } else {
     $address = test_input($_POST["address"]);
   }


//gender post

   if (empty($_POST["gender"])) {
     $genderErr = "Gender is required";
   } else {
     $gender = test_input($_POST["gender"]);
   }

    //insert information of new patient
   $signup =<<<EOF
      INSERT INTO patient (patient_id,patient_name,phone_number,e_mail, address,patient_password)
      VALUES ('$ID', '$name', '$phone', '$email', '$address','$confirm');
EOF;

   $NewPatient = pg_query($db, $signup);
   if(!$NewPatient){
      echo pg_last_error($db);//get clear erro for users like patient id has already exist
   } else {
      echo "Records created successfully\n";
   }
}

function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}


   
  
 
   echo "Operation done successfully\n";
  // pg_close($db);
?>

<h2>Register for SmartCap</h2>
    <span>Welcome!</span>
<p><span class="error">* required field.</span></p>
<form method="post" action="../Controllers/SignUpController.php"> 
   Name: <input type="text" name="name" value="<?php echo $name;?>">
   <span class="error">* <?php echo $nameErr;?></span>
   <br><br>
    ID: <input type="text" name="ID" value="<?php echo $ID;?>">
   <span class="error">* <?php echo $IDErr;?></span>
   <br><br>
    Password: <input type="password" name="password" value="<?php echo $password;?>">
   <span class="error">* <?php echo $PasswordErr;?></span>
   <br><br>
    Confirm Password: <input type="password" name="confirm" value="<?php echo $confirm;?>">
   <span class="error">* <?php echo $confirmErr;?></span>
   <br><br>
     Phone Number: <input type="text" name="phone" value="<?php echo $phone;?>">
   <span class="error">* <?php echo $phoneErr;?></span>
   <br><br>
   E-mail: <input type="text" name="email" value="<?php echo $email;?>">
   <span class="error">* <?php echo $emailErr;?></span>
   <br><br>
  Address: <input type="text" name="address" value="<?php echo $address;?>">
   <span class="error"><?php echo $addressErr;?></span>
   <br><br>
 
   Gender:
   <input type="radio" name="gender" <?php if (isset($gender) && $gender=="female") echo "checked";?>  value="female">Female
   <input type="radio" name="gender" <?php if (isset($gender) && $gender=="male") echo "checked";?>  value="male">Male
   <span class="error">* <?php echo $genderErr;?></span>
   <br><br>
   <input type="submit" name="submit" value="Submit">
</form>

<?php
echo "<h2>Your Input:</h2>";
echo $name;
echo "<br>";
echo $email;
echo "<br>";
echo $website;
echo "<br>";
echo $comment;
echo "<br>";
echo $gender;
?>
</div> 
</div>
<!-- footer -->


		<footer>
			<div class="wrapper">
				<a href="Home.html" id="footer_logo"><span>Smart</span>Cap</a>
				<ul id="icons">
					<li><a href="#" class="normaltip" title="Facebook"><img src="images/icon1.gif" alt=""></a></li>
					<li><a href="#" class="normaltip" title="Twitter"><img src="images/icon2.gif" alt=""></a></li>
					<li><a href="#" class="normaltip" title="Linkedin"><img src="images/icon3.gif" alt=""></a></li>
				</ul>
			</div>	
			<div class="wrapper">
				<nav>
					<ul id="footer_menu">
						<li class="active"><a href="index.html">Home</a></li>
						<li><a href="Mission.html">Our Mission</a></li>
						<li><a href="News.html">News &amp; Press</a></li>
						<li><a href="Help.html">Information</a></li>
						<li class="end"><a href="Contact.html">Contact</a></li>
					</ul>
				</nav>
				<div class="tel"><span>+1 800</span>123 45 67</div>
			</div>
			<div id="footer_text">
				<a rel="nofollow" href="#" target="_blank">Related Website</a> Add other related website1<br>
				<a rel="nofollow" href="#" target="_blank">website2</a>
			</div>
		</footer>
<!-- / footer -->


</div>

<style>
    /*new 9.4*/
    .error {color: #FF0000;}
/*background*/	
/* Getting the new tags to behave */
header,meter, nav, article,footer {display:block}
.wrapper {width:100%;overflow:hidden}/*all wrapper*/
/* Global properties ======================================================== */
body {background: #f0fff0  top center repeat;border:0;font:14px "Trebuchet MS", Arial, Helvetica, sans-serif;color:#575652;line-height:22px}

/* Global Structure ============================================================= */
.main {margin:0 auto;width:940px}
.body1 {background: #f0fff0 top repeat-x}
/* ============================= main layout ====================== */
a {color:#575652;text-decoration:underline;outline:none}
a:hover {text-decoration:none}
	/* ============================= main layout ====================== */
a {color:#575652;text-decoration:underline;outline:none}
a:hover {text-decoration:none}
h1 {float:left;padding:0 0 0 0}
.buttons {
	    margin-bottom:10px;
			background-color:#D6D6D6;
			font-family:Verdana;
		  font-weight:light;
      font-size:10px;
		  color: black;
		  text-align:relative;
			font-weight:bold;
			position:relative;
		  width:70px;
		  height:30px;
		  border-radius: 9px; 
		  border-width: 1px;
		  border-color:rgb(169, 169, 169);
		  /*border-top-color:#747474;*/
      /*box-shadow: inset 0 0 10px #333;*/
    -webkit-box-shadow: inset -1px -1px 8px #888, inset 1px -1px 8px #888, inset 0 6px 8px 0px #FFFFFF;
      }
h3 {font-size:35px;color:#dad6cc;font-weight:400;line-height:1.2em;padding:25px 0 0 35px;float:left;letter-spacing:-1px}
p {padding-bottom:22px}
strong {color:#dcd9cf}

/*banner*/
/* ============================= header ====================== */
header {}
#menu {background:#000;width:935px;height:30px;float:right;padding:10px 12px 20px 10px}
#menu li {float:left;padding-left:1px}
#menu li a {display:block;padding:0 20px;height:42px;font-size:18px;color:#dad6cc;line-height:42px;text-transform:uppercase;text-decoration:none;font-weight:400}
#menu li a:hover, #menu #menu_active a {background:url(images/menu_active.gif) top repeat-x;color:#fff}
#top_nav {float:right;padding:40px 37px 0 575px}
#top_logo {float:left;font-size:60px;font-weight:360;text-transform:uppercase;color:#dedbd2;line-height:1.2em;text-decoration:none;letter-spacing:-3px;margin-left:-4px}
#top_nav li {float:left;padding:4px 26px 5px 0;margin-right:25px;background: right 0 no-repeat}
#top_nav .end {padding-right:0;margin-right:0;background:none}
.slider {position:relative; z-index:2;width:100%;height:465px;overflow:hidden;margin-bottom:10px}
.slider .items {display:none} /*deside display of slides, with js*/
.pic {float:right;position:relative}
.mask {left:auto !important;right:0;width:720px !important}

.pagination {position:absolute;left:0;top:0;z-index:3}
.pagination li {width:250px;height:155px}
.pagination a {display:block;position:relative;cursor:pointer;padding:29px 0 0 33px;font-size:50px;line-height:1.2em;font-weight:400;color:#fff;text-decoration:none;text-transform:uppercase;letter-spacing:-1px;height:126px}
.pagination a span {display:block;font-weight:300;font-size:30px;line-height:1.2em;margin-top:-10px;letter-spacing:0}
#banner1 {background:url(images/banner1.png) 0 0 no-repeat}
#banner1 a {background:url(images/banner1_active.png) -250px 0 no-repeat}
#banner2 {background:url(images/banner2.png) 0 0 no-repeat}
#banner2 a {background:url(images/banner2_active.png) -250px 0 no-repeat}
#banner3 {background:url(images/banner3.png) 0 0 no-repeat}
#banner3 a {background:url(images/banner3_active.png) -250px 0 no-repeat}
.pagination #banner1:hover, .pagination #banner1.current, .pagination #banner2:hover, .pagination #banner2.current, .pagination #banner3:hover, .pagination #banner3.current {}
.banner {position:absolute;z-index:1;right:0;bottom:0;margin:0 10px 10px 0}
.banner span {float:right;padding:0 32px;margin-bottom:5px;background:#000;font-size:40px;line-height:56px;height:56px;font-weight:400;color:#dad6cc;line-height:1.2em}
.banner em {font-style:normal;text-transform:uppercase}
.banner strong {float:right;padding:0 32px;background:#000;font-size:40px;line-height:56px;font-weight:300;color:#dad6cc}

/* ============================= content ====================== */
.register_info{float:center;margin: 10px 20px 20px 10px; width:800px; height:500px}
#retitle{font-family:"Trebuchet MS" Arial, Helvetica, sans-serif; 
font-size: 25px; 
line-height: 30px; 
color: #333333; 
float:center;margin: 10px 20px 20px 10px; width:800px; height:30px}
td, th { 
font-family:"Trebuchet MS" Arial, Helvetica, sans-serif; 
font-size: 18px; 
line-height: 30px; 
color: #333333
} 
#inputx{margin-right:10px}
/* ============================= footer ====================== */
footer {background:#000;padding:21px 36px 44px}
#footler_logo {float:left;font-size:46px;font-weight:300;text-transform:uppercase;color:#dedbd2;line-height:1.2em;text-decoration:none;letter-spacing:-3px;margin-left:-4px}
#footer_logo span {color:#ffc11e}
#icons {float:right;padding:20px 0 0 0}
#icons li {float:left;padding-left:4px}
/* Tooltips 
.aToolTip {background:#ffc11e;color:#fff;font-weight:bold;margin:0;padding:2px 10px 3px;font-size:11px;position:absolute;line-height:17px}
.aToolTip .aToolTipContent {position:relative;margin:0;padding:0}*/
.tel {float:right;margin-top:-1px;background:url(images/bot_icon.gif) 0 15px no-repeat;padding:0 0 0 38px;font-size:35px;line-height:1.2em;color:#dedad1;letter-spacing:-2px;font-weight:300}
.tel span {color:#ffc11e}
footer nav {float:left}
#footer_menu {float:left;padding:15px 0 18px 0;margin-left:-1px}
#footer_menu li {float:left;padding-right:29px;background:url(images/menu_line.gif) right 0 no-repeat;margin-right:29px}
#footer_menu li a {display:block;color:#fff;text-decoration:none;line-height:20px}
#footer_menu li a:hover, #footer_menu .active a {color:#575652}
#footer_menu .end {background:none;padding-right:0;padding-left:0}
#footer_text {padding-top:18px;border-top:1px solid #0d0d0d;text-align:center}
#footer_text a {color:#fff;text-decoration:none}
#footer_text a:hover {text-decoration:underline}


.inputbox{
margin: 0;
padding: 4px 6px;
border: 2px solid rgba(240, 245, 245, 0.96);
-moz-border-radius: 0;
-webkit-border-radius: 0;
border-radius: 0;
background: #edeeee;
color: #000;
font-family: Lato,Helvetica,Arial,sans-serif;
font-size: 1.142857em;
vertical-align: baseline;
}

</style>


<script type="text/javascript">Cufon.now();</script>
<script>
	var patientID;
function myFunction(x)
{
x.style.background="yellow";
}

function IsDigit(cCheck) 
{ 
return (('0'<=cCheck) && (cCheck<='9')); 
} 

function IsAlpha(cCheck) 
{ 
return ((('a'<=cCheck) && (cCheck<='z')) || (('A'<=cCheck) && (cCheck<='Z'))) 
} 

function IsValid() //RE EDIT HERE WHEN CONNECT TO DATABASE WITH NEW CHECK for user name like:has existed...
{ 
var struserName = reg.UserName.value; 
for (nIndex=0; nIndex<struserName.length; nIndex++) 
{ 
cCheck = struserName.charAt(nIndex); 
if (!(IsDigit(cCheck) || IsAlpha(cCheck))) 
{ 
return false; 
} 
} 
return true; 
} 
function chkEmail(str) 
{ 
return str.search(/[\w\-]{1,}@[\w\-]{1,}\.[\w\-]{1,}/)==0?true:false 
} 
function  chkPID()//RE EDIT here when connect to database with check whether we have the patient in our database
{
	 patientID = reg.PID.value; 
for (nIndex=0; nIndex<patientID.length; nIndex++) 
{ 
cCheck = patientID.charAt(nIndex); 
if (!IsDigit(cCheck)) 
{ 
	
return false; 
} 
	}
}
function docheck() 
{ 
if(reg.UserName.value=="") 
{ 
alert("Please Enter your user name"); 
return false; 
} 
else if(!IsValid()) 
{ 
alert("Invalid user name. Please just include digits and character"); 
return false; 
} 
else if(reg.PID.value=="")
{ 
alert("Please enter your Patient ID"); 
return false; 
}	
/*else if(!chkPID()) 
{ 
alert("Invalid Patient ID. Please just include digits" + " "+patientID+"stop"); 
return false; 
} */
else if(reg.UserPassword.value=="") 
{ 
alert("Please enter your password"); 
return false; 
} 
else if(reg.UserPassword.value != reg.CUserPassword.value) 
{ 
alert("Conflict between two password"); 
return false; 
} 
else if(reg.Email.value =="") 
{ 
alert("Please enter you E-mail"); 
return false; 
} 
else if(!chkEmail(reg.Email.value)) 
{ 
alert("Invalid E-mail"); 
return false; 
} 
else 
{ 
return true; 
} 
} 
</script>
</body>

</html>

