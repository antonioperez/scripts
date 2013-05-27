<?php
    session_start();
	function checkSession(){
		if ($_SESSION["user"] == "") {
			redirect("index.html");
		}
	}
	function redirect($url){
  		header('Location: '.$url);
 		exit();
	}
?>




<?php
	checkSession();
?>


			<!DOCTYPE html>
			<html>
			<head>
				<script type="text/javascript" src="act.js">
				</script>
				<title>webform</title>
				
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
							width: 500px; margin: 70px auto; padding: 11px 20px;
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
				<h1>Webform</h1>
				<form name="form" method="post" action="form.php" >
				<fieldset>
				<label >First:</label>
				<input type="text" name="first" placeholder="Enter first name" value=""  pattern="[A-z]*"/>
			<br/>
				<label>Middle:</label>
				<input type="text" name="middle" placeholder="Enter Middle" value=""  pattern="[A-z]*"/>
			<br/>
				<label>Last: </label>
				<input type="text" name="last" placeholder="Enter last name" value="" pattern="[A-z]*" />
			<br/>
				<label>Email:</label>
				<input type=\"email" name="email" placeholder="Enter Email" value="" onchange="validEmail()"/>
			<br/>
				<label>PS ID:</label>
				<input type="text" name="psid" placeholder="Enter psid" value="" onchange= "isNum()" pattern="[0-9]*"/>
			<br/>
				<label>Status:</label>
				<select name="status" >
			  		<option>Stu</option>
			  		<option>Fac</option>
			  		<option>Sta</option>
				</select>
				<br/><br/><br/>
				<input type="submit" value="submit" onclick= "vaildForm()" />
				
				</fieldset>
				</form>
			</div>
			</body>
			</html>