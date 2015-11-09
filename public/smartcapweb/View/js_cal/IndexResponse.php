<?php session_start(); 
?>
<?php
 $_SESSION['AccountID']=$_POST["accountID"];
 $_SESSION['AccountType']=$_POST["type"];;
 $_SESSION['Password']=$_POST["password"];


//THIS IS PROCESSSION OF LOGIN
$AccountID=$_POST["accountID"];
$AccountType=$_POST["type"];
$Password=$_POST["password"];



//GET THE VALID PASSWORD FROM DB

try{  
//$mysql_host="mysql5.000webhost.com";
//$mysql_database="a1896209_MUSC";
$dbh=new PDO('mysql:host=mysql5.000webhost.com;dbname=a1896209_NUSC','a1896209_NUSC','Smartcap.2014');  
  
$dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);  
  
$dbh->exec("SET CHARACTER SET utf8");  
//$dbh=null; //close connection  
}catch(PDOException$e){  
print"Error!:".$e->getMessage()."<br/>";  
die();  
}  


      /*-----user identify------9.16---*/
switch ($AccountType){
        case "Patient":
          /*for postgres: $sql_password =<<<EOF
                            SELECT patient_password from patient where patient_id='$AccountID';
EOF;
          $password_query = pg_query($db, $sql_password);
          if(!$password_query){
             echo pg_last_error($db);
             exit;
          }  
          while( $password_row = pg_fetch_row($password_query)){
                 $curPassword=($password_row[0]);
          }*/
     /**************for mysql*************/     
          $sql = "SELECT `patient_password` FROM `patient` WHERE `patient_id`='$AccountID'";    
          $stmt = $dbh->prepare($sql);    
          $stmt->execute(array(':login'=>$login));    
           while($row = $stmt->fetch(PDO::FETCH_ASSOC)){       
                 $curPassword=($row);    
                }    
          
         break;

         case "Doctor":
         /*$sql_password =<<<EOF
                            SELECT password from Doctor where doctor_id='$AccountID';
EOF;
         $password_query = pg_query($db, $sql_password);
         if(!$password_query){
            echo pg_last_error($db);
            exit;
         }  
         while( $password_row = pg_fetch_row($password_query)){
                $curPassword=($password_row[0]);
         }*/
         $sql = "SELECT `doctor_password` FROM `doctor` WHERE `doctor_id`='$AccountID'";    
          $stmt = $dbh->prepare($sql);    
          $stmt->execute(array(':login'=>$login));    
           while($row = $stmt->fetch(PDO::FETCH_ASSOC)){       
                 $curPassword=($row);    
                }    
          
         break;
         
         case "Phamercy":
         break;  /**/
         default:
         $curPassword="";
} 

if ($curPassword==$Password){
    $response="valid";

   
}
else{
        $response="invalid";
}   

 echo $response;
 
?>