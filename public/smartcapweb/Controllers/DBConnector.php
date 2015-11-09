<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DBConnector
 *
 * @author mengchaowang
 */
class DBConnector {

    private static $dbConnection;

    private static function openDBConnection() {
        $configs = include('config.php');
        $connectionQuery = "host=" . $configs["host"] . " port=" . $configs["port"] .
                " dbname=" . $configs["dbname"] . " user=" . $configs["user"] .
                " password=" . $configs["password"];
        self::$dbConnection = pg_connect($connectionQuery);
        if (!self::$dbConnection) {
            echo pg_last_error();
            return FALSE;
        } else {
            return TRUE;
        }
    }

    public static function executeQuery($query, $parameters) {
        // To prevent from SQL Injection, use parameterization.
        $result = self::openDBConnection();
        if (!$result) {
            echo pg_last_error();
            return FALSE;
        } else {
            // DB Connection is open, execute the query
            $result = pg_query_params(self::$dbConnection, $query, $parameters);
            // Closing connection
            pg_close(self::$dbConnection);
            return $result;
        }
    }

}
