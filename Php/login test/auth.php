

<?php
   session_start(); 
	$_SESSION["user"]=$_POST["username"];
   	 
   	function redirect($url){
  		header('Location: '.$url);
 		exit();
	}
   	function packUser(){
		$user= $_POST["username"] . " | " .date(DATE_RSS) ."\n";
				
		return $user;
	}
   function logUser($string){
		$dir = "/var/www/secretfile/";
		$fileLocation="logins.txt";
		$handle=fopen($dir.$fileLocation,"a");
		
		fwrite($handle, $string."\n");
		fclose($handle);
   }

   function checkUser($user, $password){
   	
		/*$dir = "/var/www/secretfile/";
		$fileLocation="users.txt";
		$handle=fopen($dir.$fileLocation,"r");
		
		$contents = fread($handle, filesize($filename));
		echo $contents; */
		
		$filestring = file_get_contents("/var/www/secretfile/users.txt");
    	$filearray = explode("\n", $filestring);

    	while (list($var, $val) = each($filearray)) {
        	++$var;
        	$val = trim($val);
			$ar = explode("|", $val);
       		if ($user == $ar[0] && $password == $ar[1]) {
       			//echo "logged in";
			  	redirect("webform.php");
		   }
			//unset($ar); 
    	}
	
		redirect("index.html");
		fclose($handle);
	
   }
   	function validInput(){
		
		if($_POST["username"] == "" ||
    		$_POST["password"] == ""){
    		
    		redirect("index.html");
    	}
		else {
			logUser(packUser());
		}
	}
?>

	


<?php
	validInput();
	checkUser($_POST["username"], $_POST["password"]);


?>