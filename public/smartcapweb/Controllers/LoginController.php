<?php session_start();
?>
<?php

include('DBConnector.php');

//$_SESSION['AccountID']=$_POST["accountID"];
//$_SESSION['AccountType']=$_POST["type"];;
//$_SESSION['Password']=$_POST["password"];
$_SESSION['accountID'] = $_POST["account"];
$_SESSION['type'] = $_POST["Account_type"];
$_SESSION['password'] = $_POST["password"];


//THIS IS PROCESSSION OF LOGIN
$accountID = $_POST["account"];
$accountType = $_POST["Account_type"];
$password = $_POST["password"];

$sql_password_parameter = array($accountID);


/* -----user identify------9.16--- */
switch ($accountType) {
    case "Patient":
        $sql_password = 'SELECT patient_password from patient where patient_id = $1';
        //echo $curPassword;
        break;
    case "Doctor":
        $sql_password = 'SELECT doctor_password from octor where doctor_id = $1';
        break;
    case "Phamercy":
        break;  /**/
    default:
        return FALSE;
}
$query_result = DBConnector::executeQuery($sql_password, $sql_password_parameter);

if (!$query_result) {
    echo pg_last_error();
    return FALSE;
}

$password_row = pg_fetch_row($query_result, 0);

$curPassword = ($password_row[0]);

if ($curPassword == null) {
    echo "No password found";
    return FALSE;
}

//var_dump($password_query);
if ($curPassword == $password) {
    echo "valid";
    return "valid";
} else {
    echo "invalid";
    return "invalid";
}