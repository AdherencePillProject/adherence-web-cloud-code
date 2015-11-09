<?php 
 echo "test"; 
 $db = pg_connect("host=127.0.0.1 port=5432 dbname=SmartCapV20 user=postgres password=root");

if(!$db)
{
     echo "Error : Unable to open database\n";
   } else {
     echo "Opened database successfully\n";
  }

?>