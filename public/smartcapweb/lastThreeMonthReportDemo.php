
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="http://d3js.org/d3.v3.min.js"></script>
     <script type="text/javascript" src="http://www.amcharts.com/lib/3/amcharts.js"></script>
<script type="text/javascript" src="http://www.amcharts.com/lib/3/serial.js"></script>
<script type="text/javascript" src="http://www.amcharts.com/lib/3/themes/none.js"></script>

    Welcom Mr.John
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
  
$PatientID = "1";

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
/*
try{  
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
 <script type="text/javascript">
      function getSelectedText(name){        var obj=document.getElementById(name);        for(i=0;i<obj.length;i++){            if(obj[i].selected==true){                return obj[i].innerText;              }        }        }

       function getSelectedValue(name){        var obj=document.getElementById(name);        return obj.value;              }

        function PillAdding(name){        alert(name);           var postUrl = "./History.php";  
        var postData = name;//第一个数据 
        var ExportForm = document.createElement("FORM");  
        document.body.appendChild(ExportForm);  
        ExportForm.method = "POST";  
        var newElement = document.createElement("input");  
        newElement.setAttribute("name", "PillSelection");  
        newElement.setAttribute("type", "hidden");  
        ExportForm.appendChild(newElement);   
        newElement.value = postData;  
        ExportForm.action = postUrl;  
        ExportForm.submit();                     }

        




  </script>


</head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Individual Calendar</title>
<body>
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
      
   
		
		<h1>History for John</h1>
		
	<div class="contain">     <!---Here goes the container of the main part----->
		  <div class="form_part">                <!---Here goes left part----->
                                   <form method="post"> 
		         	   <div>Patient ID:1234567
		         	   	
                         <span>Pill Name</span>
		  		         <select name="PillSelection" class="PillSelection" id="PillSelection">
		  		         <?php 
       
                                                     
                                                    /* ****** below is for postgres***********/
$sql =<<<EOF

SELECT pill_name from pill where pill_id in (SELECT pill_id from prescription where patient_id='$PatientID')
ORDER BY pill_name;
EOF;




$ret = pg_query($db, $sql);
if(!$ret){
 echo pg_last_error($db);
 exit;
}
$pillArray  = array();
 unset($pillArray);
 $j = 0;
while($row = pg_fetch_row($ret)){
 $pillArray[$j]=($row[0]);
 $j++;
echo "<option >";
echo $row[0];
echo "</option>";}
/************end of postgres**********************************************/
    ?>   
		  	           </select>
                   <button class="inputB" id="inpB" onclick="PillAdding(getSelectedText('PillSelection'))">Choose a pill</button>
                   <!--<button class="inputC" id="inpC" onclick="displayAll()">Display All</button>-->
                 
             </form>
		  	</div> <!---Here goes form----->
		  <div id="chartdiv"></div>							
		  	<div class="mid_left">
		  		<div style="float:left">
               Pill Progress:
               <div class="progress-bar green glow" style="text-align: left;" >
                    <span style="width: 55%"></span>
               </div>
           </div>  
        </div>
      
	</div>
	
    <?php
       

        //print_r($_SERVER["REQUEST_METHOD"]);
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $Selected_pillname = $_POST["PillSelection"];
               
         }
         else{
             $Selected_pillname = $pillArray[0];
         }
   
         //Get Today Time
         $nowTime = strtotime("now");
         $nowTime = date("Y-m-d",$nowTime);
         //echo $nowTime;

         $startTimeThreeMonths = strtotime("now");
         $startTimeThreeMonths = $startTimeThreeMonths - 90*60*24*60;
         $startTimeThreeMonths = date("Y-m-d",$startTimeThreeMonths);
         //echo $startTimeThreeMonths;
   //print_r($startDates);
   //print_r($endDates);
   //print_r($timesBetweenDates);

   $actualTimes = array();
   //print_r($startDates);
   
   
       //print_r($startDates);
       //print_r($startDates[$prescriptionIndex]);
        $sql_timesInRange =<<<EOF
        SELECT DISTINCT ON (image_timestamp::DATE) image_timestamp::DATE, EXTRACT(HOUR FROM image_timestamp::TIME) from photo where patient_id = '$PatientID' and pill_id in (select pill_id from pill where pill_name= '$Selected_pillname') and image_timestamp >= ' $startTimeThreeMonths' and image_timestamp <= ' $nowTime';
EOF;
$sql_timesInRange = pg_query($db, $sql_timesInRange);
   if(!$sql_timesInRange){
      echo pg_last_error($db);
      exit;
   }     
   $actualTimes = array();
   $actualDates = array();
   $actualDateTimeHash = array();
   $actualResultIndex = 0;
   while( $timesInRange_row = pg_fetch_row($sql_timesInRange)){
       $actualTimes[$actualResultIndex] = ($timesInRange_row[1]);
       $actualDates[$actualResultIndex] = ($timesInRange_row[0]);
       $actualResultIndex = $actualResultIndex + 1; 
   }
   //print_r($actualTimes);
   //print_r($actualDates);
   $actualDateTimeHash = array_combine($actualDates, $actualTimes);
   //print_r("SOMETHING");
   //print_r($actualDateTimeHash);

  
   $displayTimes = array();
   $displayDates = array();
   $displayIndex = 0;
   //print_r($days);
   //second for loop to composite data and add to display
   /*for($displayIndex = 0; $displayIndex < $days; $displayIndex ++ ){
         $displayDay = strtotime($startDates[$prescriptionIndex]) + $displayIndex*60*24*60;
         $displayDay=date('Y-m-d',"$displayDay");
         if(array_key_exists($displayDay, $actualDateTimeHash )){
             $displayTimes[$displayIndex] = $actualDateTimeHash[$displayDay] - $timesBetweenDates[$prescriptionIndex];
         }  
         else{
             $displayTimes[$displayIndex] = -$timesBetweenDates[$prescriptionIndex];
         }
         $displayDates[$displayIndex] = str_replace("-", ",",$displayDay );
   }//end for second loop*/
   //print_r($displayDates);
   //print_r($displayTimes);

 //Stript Begin
    /*echo "<script type=\"text/javascript\">";
    echo "var chartData = [];";
    for($displayIndex = 0; $displayIndex < $actualResultIndex; $displayIndex ++ ){
    $displayDay = strtotime($actualDates[$displayIndex]);
    $displayDay=date('Y-m-d',"$displayDay");
    $displayDay = str_replace("-", ",",$displayDay );
    echo "var newDate = new Date(";
    echo $displayDay; 
    echo ");";
    echo"chartData.push({";
    echo"date:";    
    echo"newDate";
    echo",";
    echo"visits:";
    echo $actualTimes[$displayIndex];
    echo"});";
    }
    echo "</script>"; */  
    ?>
<script type="text/javascript">

    var chartData = generateChartData();
    console.log(chartData);
    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "none",
        "pathToImages": "http://www.amcharts.com/lib/3/images/",
        "dataProvider": chartData,
        "valueAxes": [{
            "axisAlpha": 0.2,
            "dashLength": 1,
            "position": "left",
            "integersOnly": "true",
            "title": "HOUR"
        }],
        "mouseWheelZoomEnabled": true,
        "graphs": [{
            "id": "g1",
            "balloonText": "[[category]]<br/><b><span style='font-size:14px;'>value: [[value]]</span></b>",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "hideBulletsCount": 50,
            "title": "red line",
            "valueField": "visits",
            "useLineColorForBulletBorder": true
        }],
        "chartScrollbar": {
            "autoGridCount": true,
            "graph": "g1",
            "scrollbarHeight": 40
        },
        "chartCursor": {
            "cursorPosition": "mouse"
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "axisColor": "#DADADA",
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "exportConfig": {
            menuRight: '20px',
            menuBottom: '30px',
            menuItems: [{
                icon: 'http://www.amcharts.com/lib/3/images/export.png',
                format: 'png'
            }]
        }
    });

    chart.addListener("rendered", zoomChart);
    zoomChart();

    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
    }


    // generate some random data, quite different range
    function generateChartData() {
        var chartData = [];
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 90);

        for (var i = 0; i < 90; i = i + 1) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            var newDate = new Date(firstDate);
            console.log(firstDate);
            newDate.setDate(newDate.getDate() + i);
           

            var visits = Math.round(Math.random() * (12) + 0.5);

            chartData.push({
                date: newDate,
                visits: visits
            });
        }
        return chartData;
    }
  </script>  

<style>
.nav{width:100%;
	   height:10%;
	   //background:blue;
}	
h1{
text-align:center ;
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
.left_top{width:100%;
		 height:15%;
		 background:#FF9933;
		 float:top;}

.left_bottom{width:100%;
		 height:85%;
		 background:#FFFFCC;
		 float:bottom;}	
/*.right_part{width:30%;
		 height:80%;
		 background:#FFC6AA;
		 float:right;
	}*/
	
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
            display: none;  
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
    
#chartdiv {
	width	: 100%;
	height	: 500px;
}							
</style>
</body>
</html>