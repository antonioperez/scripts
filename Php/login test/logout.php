<?php
	function redirect($url){
  		header('Location: '.$url);
 		exit();
	}
	session_start();
	session_destroy();
	redirect("index.html");
	
?>