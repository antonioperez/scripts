

<?php
	session_start(); 
	function redirect($url){
  		header('Location: '.$url);
 		exit();
	}
	
	function validInput(){
		
		 if($_POST["first"] == "" ||
    	$_POST["last"] == "" ||
    	$_POST["email"] == ""||
    	$_POST["psid"] == ""){
    		
    		redirect("webform.php");
    	}
		else if (!ctype_alpha($_POST["first"]) && !ctype_alpha($_POST["last"]) ){
			 redirect("webform.php");
		 }
		 else if (!ctype_digit($_POST["psid"])) {
			 redirect("webform.php");
		 }
	}
	

	function addRequest($string,$filename){
		$dir = "/var/www/secretfile/";
		$fileLocation=$filename;
		$handle=fopen($dir.$fileLocation,"a");
		
		fwrite($handle, $string."\n");
		fclose($handle);
	}
	function packRequest(){
		$request;
		if ($_POST["middle"] != "") {
			$request= $_POST["first"] ." | ". $_POST["middle"]. " | " . $_POST["last"] . " | " 
				. $_POST["psid"] . " | " . $_POST["email"] . " | " 
				.$_POST["status"] . " | ".date(DATE_RSS) ." | by " . $_SESSION["user"];
			
		}
		else {
			
		
		$request=$_POST["first"] . " | " . $_POST["last"] . " | " 
				. $_POST["psid"] . " | " . $_POST["email"] . " | " 
				.$_POST["status"] . " | ".date(DATE_RSS) ." | by " . $_SESSION["user"];
		}
				
		return $request;
	}
	
   

	function sendMail(){
		$mailtoAnt = "aperez2541@yahoo.com";
		$mailtoMax = "";
		$subject = "BlackBoard Request";
		$message= packRequest();
   	 	$mailfrom = "From: bbapp@test.com";

    	mail($mailtoAnt, $subject, $subject, $mailfrom);
		mail($mailtoMax, $subject, $subject, $mailfrom);
	}

	function checkSession(){
		if ($_SESSION["user"] == "") {
			redirect("index.html");
		}
	}
	
	function checkEmail(){
		 $email=$_POST["email"];
		 $validEmail=strpos($email, "@mail.fresnostate.edu");
		 $vaildEmail2= strpos($email, "@csufresno.edu");
	
		if ($validEmail === FALSE && $vaildEmail2 === FALSE){
  		redirect("webform.html");
  		}
	}
	

?>

<?php
	
	checkSession();
	validInput();
	checkEmail();
	addRequest("\n".packRequest(),"requests.txt");
	
		/*$data = packRequest();                                                             
		$data_string = json_encode($data);   
		                                                                      
		$ch = curl_init("https://lmsi-db.csufresno.edu/uListener.php");   

		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);                                                                 
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
		curl_setopt($ch, CURLOPT_HTTPHEADER,
                array("Content-type: application/json"));                                                                                                                 
 
		$result = curl_exec($ch);   
		curl_getinfo($ch, CURLINFO_HTTP_CODE);*/
		
		$url = "192.168.103.149/json/";
		$data = array("a"=>"Apples", "b"=>"Oranges", "c"=>"Pears");
		                                                          
		$content = json_encode($data);
        $curl = curl_init($url);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_HEADER, false);
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST"); 
		curl_setopt($curl, CURLOPT_POSTFIELDS, $content);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER,
                array("Content-type: application/json"));

        $json_response = curl_exec($curl);

        $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
			echo "status code: ", $status ,"<br/>";
            echo  $json_response;


        curl_close($curl);

        $response = json_decode($json_response, true);
		
	sendMail();

?>

<!DOCTYPE html>
			<html>
			<head>
				<script type="text/javascript" src="act.js">
				</script>
				<title>Output</title>
				
				<style type "text/css">
				  
				  
				  .logout-area {
						    font-size: 15px;
						    color: gray;
						    position: absolute;
						    top: 10px;
						    right: 100px;
						}
						
						.logout-link {
						    color: gray;
						    text-decoration: none;
						}
						
						.logout-link:visited {
						    color: gray;
						}
						
						.logout-link:hover {
						    text-decoration: underline;
						}
						
						#webform {
							width: 750px; margin: 70px auto; padding: 11px 20px;
							background: #e3e3e3; border: 1px solid #e1e1e1;
							-moz-box-shadow: 0px 0px 8px #444;
							-webkit-box-shadow: 0px 0px 8px #444;
							-webkit-border-radius: 10px;  
							border-radius: 10px;  
						}
				</style>
			</head>
			
			<body>
			
			  <div class="logout-area">
    
      		<a class="logout-link" href="logout.php">logout</a>
    
 			 </div>
			
			<div id="webform" align="center">
				<h1>Output</h1>
				<form name="form" action="webform.php">
				<fieldset>
					<br />
				<label> Your form has been submitted: </label>
				<br />
				<label> <?php echo "<br/>".packRequest() ?> </label>
				<br /><br />
				<input type="submit" value="Goback"/>
				</fieldset>
				</form>
			</div>
			</body>
			</html>




