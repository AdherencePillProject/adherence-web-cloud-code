<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of userLoginModel
 *
 * @author mengchaowang
 */
class userLoginModel {
    //put your code here
    private $username;
    private $password;
    
    public function setUsername($username){
        $this->username = $username;
    }
    public function setPassword($password){
        $this->password = $password;
    }
    
    public function getUsername(){
        return $this->username;
    }
    public function getPassword(){
        return $this->password;
    }
    
    public function validateUsernameAndPassword($username, $password){
        
    }
}
