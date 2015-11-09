<?php
session_start();

$_SESSION['accountID']=$_SESSION["accountID"];
$_SESSION['type']=$_SESSION["type"];
$_SESSION['password']=$_SESSION["password"];

//THIS IS PROCESSSION OF LOGIN
$AccountID=$_SESSION["accountID"];
$AccountType=$_SESSION["type"];
$Password=$_SESSION["password"];
$PatientID = $AccountID;
php?>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>Welcom Mr.John
	<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="description" content="%description%" />
    <meta name="keywords" content="" />
    <meta name="author" content="ComponentOne" />

	

<!--------open database------------->
<?php
/********when you need to connect to the database in your computer with
********postgreSQL please change the query comments here with synax of 
********php to connect to the postgreSQL******************************/
/*--------Postgresql-------------*/
   $db = pg_connect("host=127.0.0.1 port=5432 dbname=SmartCapV21 user=postgres password=root");
   //$db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db){
      echo "Error : Unable to open database\n";
   } else {
     // echo "Opened database successfully\n";
   }
  
$PatientID = '1';
$AccountID = $PatientID;
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
		
		<h1 >Report for John<?php //in order to change the name of a real user, you can "echo $username" here,$username is the name you get from database
			?></h1>
		<h3>June 8-14 2014</h3>
	<div class="contain">     <!---Here goes the container of the main part----->
		  <div class="form_part">                <!---Here goes left part----->
                                   <form method="post"> 
		         	   <div>Patient ID:1234567
		         	   	Year
		         	   		<select name="YearSelection" class="YearSelection" id="YearSelection">
		  		         <option selected>Select a year</option>	
		  		         <?php
		  		         //you need to add query about years from database here. youcan get it from photo table. 
		  		         ?>
		  		         <option>2012</option>	
		  		         <option>2013</option>	
		  		         <option>2014</option>	
		  		          </select>
		  	           <span>Month</span>
		  		         <select name="MonthSelection" class="MonthSelection" id="MonthSelection">
		  		         <option selected>Select a Month</option>	
		  		         <?php 
       
       /*please change the following code to query of month*/                                              
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
/************end of postgres**********************************************/

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
		  	           </select>
		  	           Week
		         	   		<select name="WeekSelection" class="WeekSelection" id="WeekSelection">
		  		         <option selected>Select a week</option>	
		  		         <?php
		  		         //you need to add query about years from database here. youcan get it from photo table. 
		  		         ?>
		  		         <option>01</option>	
		  		         <option>02</option>	
		  		         <option>03</option>	
		  		          </select>
		  	           
                   <button class="inputB" id="inpB" onclick="PillAdding()">Choose a pill</button>
                 
             </form>
		  	</div> <!---Here goes form----->
		  </div>
		  	<div class="top_part">here is the chart<div id="chart_div" style="width: 1000px; height: 600px; float:left "></div></div> 
		  <div class="mid_part">
		  	<div class="mid_left">
		  		<div style="float:left">
               Pill Progress:
               <div class="progress-bar green glow" >
                    <span style="width: 55%"></span>
               </div>
           </div> 
           <div style="float:left">
              Pill Progress:
               <div class="progress-bar green glow" >
                    <span style="width: 55%"></span>
               </div>
           </div> 
        </div>
		  	<div class="mid_right">Advise from Dr. Tom
		  		<ul><li>Point 1</li><li>Point 2</li><li>Point 3</li></ul>
		  		</div>
		  	</div>
		  <div class="bottom_part">
		  	<!--This part should be wriiten in php in order to get data from database-->
		  <table style="width:100%">
  <tr>
    <th>Pill Name</th>
    <th>Device Number</th>		
    <th>Date</th>
    <th>Pharmacy</th>
    <th>Doctor</th>		
    <th>Description</th>
  </tr>
  <tr>
    <td>Aspirin</td>
    <td>S001</td>		
    <td>2014-4-24</td>
    <td>Walgreens</td>
    <td>Smith</td>		
    <td>take it on time</td>
  </tr>
  <tr>
    <td>Aspirin</td>
    <td>S001</td>		
    <td>2014-6-26</td>
    <td>Walgreens</td>
    <td>Smith</td>		
    <td>take it on time</td>
  </tr>
  <tr>
    <td>Aspirin</td>
    <td>S001</td>		
    <td>2014-11-14</td>
    <td>Walgreens</td>
    <td>Smith</td>		
    <td>take it on time</td>
  </tr>
</table>
		</div>
		  
		  </div>
		  </div>
		  
		  	
      
	</div>
<?php

/************uncomment following part if you use postgreSQL ****************************************************/
    /*echo"<script type=\"text/javascript\">";
    echo"var date=new Array();
         var pill=new Array();
         var times=new Array();";
         $r = count($targetDate_array);
         $index=$r-2;
         while ($r-1){

echo             " var t=".$index;
echo          ";
                   date[t]=\"".$targetDate_array[$index];
echo         "\";";
$r--;
$index--;
} 

 $t = count($targetTimes_array);
         $i=$t-2;
         while ($t-1){

echo             " var t=".$i;
echo          ";
                   times[t]=".$targetTimes_array[$i];
echo         ";";
$t--;
$i--;
} 

    echo "  google.load(\"visualization\", \"1\", {packages:[\"corechart\"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
           
         
        var data = google.visualization.arrayToDataTable([
         ['Day', 'Aspirin'],";
          $n=2;
          while($n>0){
              
              echo "[date[".$n;
              echo "], times[".$n;
              echo "]],";
                $n--;
              }
              echo "[date[0],times[0]]
          
            
         
        ]);
        
        var options = {
          title: 'Daily Pill Taking'
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
      
     
 


    </script>";
    */?>
<!--basic javascript for chart-->
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1.1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable
            ([['X', 'lineDashStyle: [1, 1]', 'lineDashStyle: [2, 2]',
               'lineDashStyle: [4, 4]', 'lineDashStyle: [5, 1, 3]',
               'lineDashStyle: [4, 1]',
               'lineDashStyle: [10, 2]', 'lineDashStyle: [14, 2, 7, 2]',
               'lineDashStyle: [14, 2, 2, 7]',
               'lineDashStyle: [2, 2, 20, 2, 20, 2]'],
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
              [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
              [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
              [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
              [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
              [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
              [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        ]);

        var options = {
          hAxis: { maxValue: 10 },
          vAxis: { maxValue: 18 },
          chartArea: { width: 380 },
          lineWidth: 4,
          series: {
            0: { lineDashStyle: [1, 1] },
            1: { lineDashStyle: [2, 2] },
            2: { lineDashStyle: [4, 4] },
            3: { lineDashStyle: [5, 1, 3] },
            4: { lineDashStyle: [4, 1] },
            5: { lineDashStyle: [10, 2] },
            6: { lineDashStyle: [14, 2, 7, 2] },
            7: { lineDashStyle: [14, 2, 2, 7] },
            8: { lineDashStyle: [2, 2, 20, 2, 20, 2] }
          },
          colors: ['#e2431e', '#f1ca3a', '#6f9654', '#1c91c0',
                   '#4374e0', '#5c3292', '#572a1a', '#999999', '#1a1a1a'],
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    </script>
<style>
h1{
text-align:center ;
}
h3{
text-align:center ;
}
.nav{width:100%;
	   height:10%;
	   //background:blue;
}	
.contain{width:90%;
		 height:80%;
		 /*background:#99CCFF;*/
}
.form_part{width:100%;
		 height:10%;
		/*background:#000099;*/
     float:left;

text-align:center ;

	}
.mid_left{width:45%;
		 height:30%;
		 background:#FF9933;
		 float:left;
		 margin-right:5px;}

.mid_right{width:45%;
		 height:30%;
		 background:#FFFFCC;
		 float:left;
		margin-left:5px;
		 }	
.bottom_part{width:100%;
		 height:30%;
		 margin-top:20px;
		 background:#FFC6AA;
		 float:bottom;
	}
	
/*nav*/
#menu {background:#000;width:90%;height:90%px;float:left;padding:0px 0px 0px 0px;margin:0px;}
#menu li {float:left;padding-left:1px}
#menu li a {display:block;padding:0 20px;height:42px;font-size:18px;color:#dad6cc;line-height:42px;text-transform:uppercase;text-decoration:none;font-weight:400}
#menu li a:hover, #menu #menu_active a {background:url(images/menu_active.gif) top repeat-x;color:#fff}
/*calendar*/
.Prog {    
position: relative;    
width: 200px;     
border: 1px solid #B1D632;    
padding: 1px;    
} 


/*---------------------------*/			
        
        .progress-bar {/*the whole part*/
            background-color: #1a1a1a;
            height: 25px;
            padding: 5px;
            width: 350px;
            margin: 5px 0 5px 0;	
			
            -moz-border-radius: 5px;
			-webkit-border-radius: 5px;
			border-radius: 5px;
			
            -moz-box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;
			-webkit-box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;
			box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;   
        }
        
        .progress-bar span {/*the color bar represent the progress*/
            display: inline-block;
            height: 100%;
			background-color: #777;
			
            -moz-border-radius: 3px;
			-webkit-border-radius: 3px;
			border-radius: 3px;
			
            -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;
			-webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;
			box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;
			
			-webkit-transition: width .4s ease-in-out;
			-moz-transition: width .4s ease-in-out;
			-ms-transition: width .4s ease-in-out;
			-o-transition: width .4s ease-in-out;
			transition: width .4s ease-in-out;	
        }
		
		/*---------------------------*/			
		
       

        .green span {/*decide the color of the progress*/
			  background-color: #a5df41;
			  background-image: -webkit-gradient(linear, left top, left bottom, from(#a5df41), to(#4ca916));
			  background-image: -webkit-linear-gradient(top, #a5df41, #4ca916);
			  background-image: -moz-linear-gradient(top, #a5df41, #4ca916);
			  background-image: -ms-linear-gradient(top, #a5df41, #4ca916);
			  background-image: -o-linear-gradient(top, #a5df41, #4ca916);
			  background-image: linear-gradient(top, #a5df41, #4ca916);  
        }		
		
		/*---------------------------*/		

		
		.glow span {/*shinning display*/
            -moz-box-shadow: 0 5px 5px rgba(255, 255, 255, .7) inset, 0 -5px 5px rgba(255, 255, 255, .7) inset;
			-webkit-box-shadow: 0 5px 5px rgba(255, 255, 255, .7) inset, 0 -5px 5px rgba(255, 255, 255, .7) inset;
			box-shadow: 0 5px 5px rgba(255, 255, 255, .7) inset, 0 -5px 5px rgba(255, 255, 255, .7) inset;
			
            -webkit-animation: animate-glow 1s ease-out infinite;
            -moz-animation: animate-glow 1s ease-out infinite; 			
		}
/*shinning display*/
		@-webkit-keyframes animate-glow {
		 0% { -webkit-box-shadow: 0 5px 5px rgba(255, 255, 255, .7) inset, 0 -5px 5px rgba(255, 255, 255, .7) inset;} 
		 50% { -webkit-box-shadow: 0 5px 5px rgba(255, 255, 255, .3) inset, 0 -5px 5px rgba(255, 255, 255, .3) inset;} 
		 100% { -webkit-box-shadow: 0 5px 5px rgba(255, 255, 255, .7) inset, 0 -5px 5px rgba(255, 255, 255, .7) inset;}
		 }

		@-moz-keyframes animate-glow {
		 0% { -moz-box-shadow: 0 5px 5px rgba(255, 255, 255, .7) inset, 0 -5px 5px rgba(255, 255, 255, .7) inset;} 
		 50% { -moz-box-shadow: 0 5px 5px rgba(255, 255, 255, .3) inset, 0 -5px 5px rgba(255, 255, 255, .3) inset;} 
		 100% { -moz-box-shadow: 0 5px 5px rgba(255, 255, 255, .7) inset, 0 -5px 5px rgba(255, 255, 255, .7) inset;}
		 }
         /*progress css end*/
         
  /*table css*/
 table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 5px;
}
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
