<!DOCTYPE html>
<html lang="en" >
    <head>
        <meta charset="utf-8" />
        <title>Message</title>

        
    </head>
    <body>
        <div class="container">

            <ul id="nav" style="margin-left:2px;border-radius:9px;">
                <li style="text-align:center;"><a href="UserIndex.html"><img src="index_photo.jpg" style="margin:0 auto;width:25%;height:100%;border-radius:2000px;margin:5px"/><br>Welcom! Mr. John</a></li>
                <li><a href="#" class="sub" tabindex="1"><img src="red_p.jpg" alt="" />Hi, John, please ...(here is a brief version of message)</a>
                    <ul>
                        <li><a href="#">here is the full version of message</a></li>
                        
                    </ul>
                </li>
                <li><a href="#" class="sub" tabindex="1"><img src="blue_p.jpg" alt="" />Hi, John, please ...(here is a brief version of message)</a>
                    <ul>
                        <li><a href="#">here is the full version of message</a></li>
                        
                    </ul>
                </li>
                <li><a href="#" class="sub" tabindex="1"><img src="orange_p.jpg" alt="" />Hi, John, please ...(here is a brief version of message)</a>
                    <ul>
                        <li><a href="#">here is the full version of message</a></li>
                        
                    </ul>
                </li>
            </ul>

        </div>

        
        
<style>
 *{
    margin:0;
    padding:0;
}

body {
    background-color:#0E2A33;
    
    color:#fff;
    font:14px/1.3 Arial,sans-serif;
}


.container {
    background: scroll 90px 35px rgba(255, 255, 255, 0.6);
    background-color:#0E2A33;
    /*border: 1px solid #FFFFFF;*/
    height:100%;
    margin:0px auto;
    padding:10px;
    position:relative;
    width:80%;

    border-radius:5px;
    -moz-border-radius:5px;
    -webkit-border-radius:5px;
}       	
        	
        	
        	
        	#nav {
        		
    border:1px solid #CFD4D6;
 height:100%;
 width:100%;
    box-shadow:2px 2px 8px #000000;
    border-radius:15px;
    -moz-border-radius:6px;
    -webkit-border-radius:6px;
    background:#8AB8E6;
}
#nav, #nav ul {

    list-style:none;
    padding:0;
    width:100%;
}
#nav ul {
    position:relative;
    z-index:-1;
    width:100%;
}
#nav li {
	 
    position:relative;
    z-index:100;
    width:100%;
}
#nav ul li {
    margin-top:-23px;

    -moz-transition:  0.4s linear 0.4s;
    -ms-transition: 0.4s linear 0.4s;
    -o-transition: 0.4s linear 0.4s;
    -webkit-transition: 0.4s linear 0.4s;
    transition: 0.4s linear 0.4s;
    width:100%;
}
#nav li a {
    

    width:98%;
    color:#000;
    display:block;
    font-size:12px;
    font-weight:bold;
    line-height:28px;
    outline:0;
    padding-left:15px;
    text-decoration:none;
}
#nav li a.sub {
    background:#d4d5d8 url("../images/down.gif") no-repeat;
}
#nav li a + img {
    cursor:pointer;
    display:none;
    
    left:0;
    position:absolute;
    top:0;
    
}
#nav li a img {
    border-width:0px;
    height:5%;
    line-height:28px;
    margin-right:8px;
    vertical-align:middle;
    width:5%;
}
#nav li a:hover {
    background-color:#bcbdc1;
}
#nav ul li a {
    background-color:#eee;
    border-bottom:1px solid #ccc;
    color:#000;
    font-size:11px;
    line-height:22px;
}
#nav ul li a:hover {
    background-color:#ddd;
    color:#444;
}
#nav ul li a img {
    /*background: */
    border-width:0px;
    height:16px;
    line-height:22px;
    margin-right:5px;
    vertical-align:middle;
    width:16px;
}
#nav ul li:nth-child(odd) a img {
    /*background:url("../images/bulb2.png") no-repeat;*/
}
#nav a.sub:focus {
    background:#bcbdc1;
    outline:0;
}
#nav a:focus ~ ul li {
    margin-top:0;

    -moz-transition:  0.4s linear;
    -ms-transition: 0.4s linear;
    -o-transition: 0.4s linears;
    -webkit-transition: 0.4s linears;
    transition: 0.4s linear;
}
#nav a:focus + img, #nav a:active + img {
    display:block;
}
#nav a.sub:active {
    background:#bcbdc1;
    outline:0;
}
#nav a:active ~ ul li {
    margin-top:0;
}
#nav ul:hover li {
    margin-top:0;
}

        </style>
    </body>
</html>
