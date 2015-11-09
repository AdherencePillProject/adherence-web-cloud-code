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


/*************OPEN DATABASE******************************/
/*--------Postgresql-------------*/
   $db = pg_connect("host=127.0.0.1 port=5432 dbname=SmartCapV21 user=postgres password=root");
   //$db = pg_connect( "$host $port $dbname $credentials"  );
   if(!$db){
      echo "Error : Unable to open database\n";
   } else {
     // echo "Opened database successfully\n";
   }
  

$sql_name =<<<EOF
                            SELECT pill_name from pill where pill_id in (SELECT pill_id from prescription where patient_id= '$PatientID'); 
EOF;
$name_query = pg_query($db, $sql_name);
   if(!$name_query){
      echo pg_last_error($db);
      exit;
   }  
   $name  = array();
   unset($name);
   $i = 0;
   $pillname = "";
   while( $name_row = pg_fetch_row($name_query)){
     $name[$i]=($name_row[0]);
     $i++;
   }

   for($j=0; $j < $i; $j++){
        $pillname=$pillname."\"".$name[$j]."\"";
      }

echo $pillname;

?>