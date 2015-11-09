<?php session_start(); 
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>Welcome
	<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="description" content="%description%" />
    <meta name="keywords" content="" />
    <meta name="author" content="ComponentOne" />

	<!-- *include -->
    <script src="http://localhost:28746/js_cal/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="http://localhost:28746/js_cal/jquery-ui-1.8.18.custom.min.js" type="text/javascript"></script>
    <script src="http://localhost:28746/js_cal/globalize.min.js" type="text/javascript"></script>
    <script src="http://localhost:28746/js_cal/globalize.cultures.js" type="text/javascript"></script>
    <script src="http://localhost:28746/js_cal/jquery.mousewheel.min.js" type="text/javascript"></script>
    <script src="http://localhost:28746/js_cal/jquery.wijmo-open.all.2.0.3.min.js" type="text/javascript"></script>
    <script src="http://localhost:28746/js_cal/jquery.plugin.wijtextselection.js" type="text/javascript"></script>
	<script src="http://localhost:28746/js_cal/jquery.wijmo.wijinputcore.js" type="text/javascript"></script>
    <script src="http://localhost:28746/js_cal/jquery.wijmo.wijinputdate.js" type="text/javascript"></script>
    <script src="http://localhost:28746/js_cal/amplify.core.min.js" type="text/javascript"></script>
    <script src="http://localhost:28746/js_cal/amplify.request.min.js" type="text/javascript"></script>
    <script src="http://localhost:28746/js_cal/amplify.store.min.js" type="text/javascript"></script>
	<script src="http://localhost:28746/js_cal/jquery.wijmo.wijdatepager.js" type="text/javascript"></script>
    <script src="http://localhost:28746/js_cal/jquery.wijmo.wijevcal.js" type="text/javascript"></script>
    
    <link href="http://localhost:28746/theme/jquery.wijmo-open.2.0.3.css" rel="stylesheet" type="text/css" />
	<link href="http://localhost:28746/theme/jquery-wijmo.css" rel="stylesheet" type="text/css" />
    <link href="http://localhost:28746/theme/jquery.wijmo.wijinput.css" rel="stylesheet" type="text/css" />
    <link href="http://localhost:28746/theme/jquery.wijmo.wijevcal.css" rel="stylesheet" type="text/css" />
    <link href="http://localhost:28746/theme/jquery.wijmo.wijdatepager.css" rel="stylesheet" type="text/css" />
 <!-----end for js of calendar---------->   

<!--------open database------------->
<?php

$_SESSION['accountID']=$_SESSION["accountID"];
$_SESSION['type']=$_SESSION["type"];
$_SESSION['password']=$_SESSION["password"];


//THIS IS PROCESSSION OF LOGIN
$AccountID=$_SESSION["accountID"];
$AccountType=$_SESSION["type"];
$Password=$_SESSION["password"];
$PatientID = $AccountID;

    
/*--------Postgresql-------------*/
   $db = pg_connect("host=127.0.0.1 port=5432 dbname=SmartCapV21 user=postgres password=root");
   //$db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db){
      echo "Error : Unable to open database\n";
   } else {
     // echo "Opened database successfully\n";
   }
  
$sql_name =<<<EOF
                            SELECT patient_name from patient where patient_id='$AccountID';
EOF;
$name_query = pg_query($db, $sql_name);
   if(!$name_query){
      echo pg_last_error($db);
      exit;
   }  

   while( $name_row = pg_fetch_row($name_query)){
     $name=($name_row[0]);
   }

/*--------Mysql-------------*/
/*try{  
//$mysql_host="mysql5.000webhost.com";
//$mysql_database="a1896209_MUSC";
$dbh=new PDO('mysql:host=mysql5.000webhost.com;dbname=a1896209_NUSC','a1896209_NUSC','Smartcap.2014');  
  $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  
  //$dbh=null; //close connection  
}catch(PDOException$e){  
print"Error!:".$e->getMessage()."<br/>";  
die();  
}  
$pill = "";
  //$sql = "SELECT `pill_name` FROM `pill` WHERE `pill_id`='A1234'";   
$PatientID = "1234567";
$sql = "SELECT `pill_name` from `pill` where `pill_id` in (SELECT `pill_id` from `prescription` where `patient_id`='$PatientID')"; 
          $stmt = $dbh->prepare($sql);    
          $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 

   for($i=0; $row = $stmt->fetch(); $i++){
        echo $i." - ".$row['pill_name']."<br/>";
      }

echo $pill;*/
?>
</head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Individual Calendar</title>
<body>
    <div class="welcome">
        <?php
            echo "<span >";
            echo $name;
            echo "</span>";       
            php?>
    </div>
	<div class="nav">
		<nav>
					<ul id="menu">
						<li id="menu_active"><a href="index.php">Home</a></li>
						<li><a href="Mission.html">Our Mission</a></li>
						<li><a href="News.html">News &amp; Press</a></li>
						<li><a href="Help.html">Information</a></li>
						<li><a href="Contact.cshtml">Contact</a></li>
						<li><a href="Home.cshtml">Log Out</a></li>
					</ul>
				</nav>
		</div> <!---Here goes nav bar----->
	<div class="contain">here is contain       <!---Here goes the container of the main part----->
		  <div class="left_part">                <!---Here goes left part----->
		  	<div class="left_top">
		         <form method="post"> 
		         	   <div>
		  	           <div><span>Pill Name</span>
		  		         <select name="PillSelection" class="PillSelection" id="PillSelection">
		  		         <option selected>Select a pill</option>	
		  		         <?php 
       
                                                     
                                                    /* ****** below is for postgres***********/
$sql =<<<EOF
SELECT pill_name from pill where pill_id in (SELECT pill_id from prescription where patient_id='$PatientID');
EOF;




$ret = pg_query($db, $sql);
if(!$ret){
 echo pg_last_error($db);
 exit;
}
while($row = pg_fetch_row($ret)){
echo "<option >";
echo $row[0];
echo "</option>";}

/************below is for Mysql****************************/
/*$pill_sql = "SELECT `pill_name` from `pill` where `pill_id` in (SELECT `pill_id` from `prescription` where `patient_id`='$PatientID')"; 
          $pill_stmt = $dbh->prepare($pill_sql);    
          $pill_stmt->execute();

    // set the resulting array to associative
    $pill = $pill_stmt->setFetchMode(PDO::FETCH_ASSOC); 
    for($i=0; $row = $pill_stmt->fetch(); $i++){
       echo "<option >";
       echo $row['pill_name'];
       echo "</option>";
        //echo $i." - ".$row['pill_name']."<br/>";
      }
   
      */
   
    ?>   
		  	           </select></div>
                   <button class="inputB" id="inpB" onclick="PillAdding()">Choose a pill</button>
                 </div>
             </form>
		  	</div> <!---Here goes form----->
		  	<div class="left_bottom">
		  	<div class="main demo">
            <!-- Begin demo markup -->
               <div id="eventscalendar">here is calendar</div>
            <!-- End demo markup -->
            <div class="demo-options">
                <!-- Begin options markup -->
                <!-- End options markup -->
            </div>
        </div>	
		  		
		  	</div><!---Here goes calendar----->
		  </div>
		  
		  	<div class="right_part">here is right</div> <!---Here goes descripton based on left part----->
      
	</div>
<style>
.nav{width:90%;
	   height:10%;
	   background:blue;}	
.contain{width:90%;
		 height:80%;
		 background:#99CCFF;
}
.left_part{width:70%;
		 height:80%;
		 background:#000099;
     float:left;
	}
.left_top{width:100%;
		 height:15%;
		 background:#FF9933;
		 float:top;}

.left_bottom{width:100%;
		 height:85%;
		 background:#FFFFCC;
		 float:bottom;}	
.right_part{width:30%;
		 height:80%;
		 background:#FFC6AA;
		 float:right;
	}
	
/*nav*/
#menu {background:#000;width:90%;height:90%px;float:left;padding:0px 0px 0px 0px;margin:0px;}
#menu li {float:left;padding-left:1px}
#menu li a {display:block;padding:0 20px;height:42px;font-size:18px;color:#dad6cc;line-height:42px;text-transform:uppercase;text-decoration:none;font-weight:400}
#menu li a:hover, #menu #menu_active a {background:url(images/menu_active.gif) top repeat-x;color:#fff}
/*calendar*/
 #eventscalendar
        {
            width: 750px;
        }
 .dot1{
	height: 12px;
width: 12px;
/* border: 1px solid; */
-webkit-border-radius: 8px;
-moz-border-radius: 8px;
border-radius: 8px;
margin: 2px;
position: relative;
left: 10px;
background:red;
	}
.dot2{
	height: 12px;
width: 12px;
/* border: 1px solid; */
-webkit-border-radius: 8px;
-moz-border-radius: 8px;
border-radius: 8px;
margin: 2px;
position: relative;
left: 10px;
background:#660066;
	}
.dot3{
	height: 12px;
width: 12px;
/* border: 1px solid; */
-webkit-border-radius: 8px;
-moz-border-radius: 8px;
border-radius: 8px;
margin: 2px;
position: relative;
left: 10px;
background:#000066;
	}
.dot4{
	height: 12px;
width: 12px;
/* border: 1px solid; */
-webkit-border-radius: 8px;
-moz-border-radius: 8px;
border-radius: 8px;
margin: 2px;
position: relative;
left: 10px;
background:#009933;
	}
.dot0{
	height: 12px;
width: 12px;
/* border: 1px solid; */
-webkit-border-radius: 8px;
-moz-border-radius: 8px;
border-radius: 8px;
margin: 2px;
position: relative;
left: 10px;
background:#663300;
	}
</style>

 <script type="text/javascript">
 /*********show the calendar****************/
    	$(document).ready(function () {
    		$("#eventscalendar").wijevcal();
    	});
    </script>
</body>
</html>
