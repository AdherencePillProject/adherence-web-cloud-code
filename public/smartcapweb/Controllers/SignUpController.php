<?php

include('DBConnector.php');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SignUpController
 *
 * @author mengchaowang
 */
if (isset($_POST['submit'])) {
    $params = array($_POST["name"], $_POST["ID"], $_POST["password"], $_POST["phone"], $_POST["email"], $_POST["address"]);

// We need to find a way to hash the password instead of storing plaintext
    $query = 'INSERT INTO patient(patient_id, patient_name, phone_number, e_mail, address, patient_password) '
            . 'VALUES($1, $2, $3, $4, $5, $6);';
    $result = DBConnector::executeQuery($query, $params);

    //var_dump($result);
    if (!$result) {
        echo "FALSE";
    }
    header('Location: /SmartCapWeb-V2.0/View/login.php');
}

