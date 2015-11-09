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
   


/*--------Mysql-------------*/
/*try{  
$dbh=new PDO('mysql:host=mysql5.000webhost.com;dbname=a1896209_NUSC','a1896209_NUSC','Smartcap.2014');  
  $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  
  //$dbh=null; //close connection  
}catch(PDOException$e){  
print"Error!:".$e->getMessage()."<br/>";  
die();  
}  
$pill = array();

   
$PatientID = "1234567";
$sql = "SELECT `pill_name` from `pill` where `pill_id` in (SELECT `pill_id` from `prescription` where `patient_id`='$PatientID')"; 
          $stmt = $dbh->prepare($sql);    
          $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    
   for($i=0; $row = $stmt->fetch(); $i++){
        $pill[$i] = $row['pill_name'];
        $pillname=$pillname."\"".$pill[$i]."\"";
      }

      */
echo $pillname;

?>