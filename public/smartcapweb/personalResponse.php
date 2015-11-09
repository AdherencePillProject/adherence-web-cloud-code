<?php
session_start();

$col_date=$_POST["curdate"];
$Pill_Name=$_POST["pillname"];
$_SESSION['accountID']=$_SESSION["accountID"];
$_SESSION['type']=$_SESSION["type"];
$_SESSION['password']=$_SESSION["password"];


//THIS IS PROCESSSION OF LOGIN
$AccountID=$_SESSION["accountID"];
$AccountType=$_SESSION["type"];
$Password=$_SESSION["password"];
$PatientID = $AccountID;

//get date of tomorrow
$datetype=strtotime("$col_date");
$datetype=$datetype+60*24*60;
$datetype=date('Y-m-d',"$datetype");
$col_next_date=$datetype;
/*********************database connection******************************/

/*********************Postgres******************************/
   $db = pg_connect("host=127.0.0.1 port=5432 dbname=SmartCapV21 user=postgres password=root");
   //$db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db){
      echo "Error : Unable to open database\n";
   } else {
     // echo "Opened database successfully\n";
   }
  

$sql_name =<<<EOF
                            SELECT count(*) as times from photo where patient_id = '$PatientID' and pill_id in (select pill_id from pill where pill_name= '$Pill_Name') and image_timestamp >= '$col_date' and image_timestamp <= '$col_next_date';
EOF;
$name_query = pg_query($db, $sql_name);
   if(!$name_query){
      echo pg_last_error($db);
      exit;
   }  
   $times  = 0;
   while( $name_row = pg_fetch_row($name_query)){
     $times=($name_row[0]);
   }

   
/*********************Mysql******************************/
/*try{  
$dbh=new PDO('mysql:host=mysql5.000webhost.com;dbname=a1896209_NUSC','a1896209_NUSC','Smartcap.2014');  
  $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  
  //$dbh=null; //close connection  
}catch(PDOException$e){  
print"Error!:".$e->getMessage()."<br/>";  
die();  
}  
//$times = 0;
$PatientID = "1234567";
$sql= "SELECT count(*) as `times` from `photo` where `patient_id` = '{$PatientID}' and `pill_id` in (select `pill_id` from `pill` where `pill_name`= '{$Pill_Name}') and `image_timestamp` >= '{$col_date}' and `image_timestamp` <= '{$col_next_date}'";

//$sql = "SELECT `pill_name` from `pill` where `pill_id` in (SELECT `pill_id` from `prescription` where `patient_id`='$PatientID')"; 
          $stmt = $dbh->prepare($sql);    
          $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 

   for($i=0; $row = $stmt->fetch(); $i++){
        $times = $row['times'];
//$Pill_Name=$Pill_Name."here is ajax";
              }*/
echo $times;
?>