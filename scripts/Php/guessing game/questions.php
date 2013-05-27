<?php 
include_once("app.php");
session_start();
if (!$_SESSION['pass'] || !$_SESSION['player']) {
	header('Location: login.html');
}


$display = "WHOOPS! <a href='index.php'> GO BACK TO CHOOSE CATEGORY</a>";
$data = array();
if (isset($_POST['choice'])) {
	if ($_POST['choice']=='movie') {
		$data = movie_info($_SESSION['pass']);
		$name = $data['title'];
		$_SESSION['data'] = $data;
		
		$display = "
		<br><u> Movies from year 2000 till present </u> <br> <br>
		<label>Movie/Show: <b>$name</b></label>
			<button class='btn-block' type='button' onclick='toggle_radio(true,\"input5\");'>
					<input type='radio' name='input' id = 'input5' value = '5'>
				What is production year? (5 points)
			</button>
			<br>
			<button class='btn-block' type='button' onclick='toggle_radio(true,\"input3\");'>
					<input  type='radio' name='input' id = 'input3' value = '3'>
				Name an Actor in the Movie. (3 points)
			</button>
			<br>
			<button class='btn-block' type='button' onclick='toggle_radio(true,\"input2\");'>
				<input  type='radio' name='input' id = 'input2' value= '2'>
				What is the genre? (2 point)
			</button>
			<br />
			
			<input type='text' name='answer' /><br>
			<input type='submit' />";
	}
	elseif ($_POST['choice']=='actor') {
		$data = actor_info($_SESSION['pass']);
		$name = $data['title'];
		$_SESSION['data'] = $data;
		
		$display = "<label>Actor: <b>$name</b></label>
			<button class='btn-block' type='button' onclick='toggle_radio(true,\"input5\");'>
				<input type='radio' name='input' id = 'input5' value = '5'>
				Number of roles? (5 points)
			</button>
			<br>
			<button class='btn-block ' type='button' onclick='toggle_radio(true,\"input3\");'>
				<input type='radio' name='input' id = 'input3' value = '3'>
				Name one character that the actor played. (3 points)
			</button>
			<br>
			<button class='btn-block' type='button' onclick='toggle_radio(true,\"input2\");'>
				<input type='radio' name='input' id = 'input2' value = '2'>
				Name one movie the actor was in. (2 points)
			</button>
			<br><input type='text' name='answer' />
			<input type='submit'/>";
	}
	elseif ($_POST['choice']=='company') {
		$data = company_info($_SESSION['pass']);
		$name = $data['title'];
		$_SESSION['data'] = $data;
		
		$display = "<label>Company Name: <b>$name</b></label>
			<button class='btn-block' type='button' onclick='toggle_radio(true,\"input5\");'>
					<input type='radio' name='input' value = '5' id = 'input5' >
				What type of company is it? Production Company.. Distributors? (5 points)
			</button>
			<br>
			<button class='btn-block' type='button' onclick='toggle_radio(true,\"input3\");'>
					<input  type='radio' name='input' id = 'input3' value = '3'>
				How many movies were they involved in? (3 points)
			</button>
			<br>
			
			<input type='text' name='answer' />
			<input type='submit' />";
	}

}


?>

<!DOCTYPE html>
<html>
	<head>

		<link href="static/css/proj3.css" rel="stylesheet" type="text/css"/>
				<script src="static/js/proj3.js"></script>
	</head>
	<body class="backcolor">		
		<div align="right"><a href='index.php'>Go back! </a></div>
		<div align='center' class='movie'>
			<form method='post' action="results.php">
				<?php echo $display; ?>
				
			</form>
		</div>
		
		<div align="left" class=""> <br />
			For the sake of testing. <br>
			<?php 
			if ($data) {
				
			
			  $title = $data["title"];
			  $answer1 = $data['text'];
			  $answer2 = $answer3 ="";
			  foreach ($data['array_1'] as $value) {
				  $answer2 .= "$value,";
			  }
			  foreach ($data['array_2'] as $value) {
				  $answer3 .= "$value,";
			  }
			  
			  echo" Title: <b> $title </b> <br><br>
			  		Answer 1: <b> $answer1 </b><br><br>
			  		Answer 2 is one of these:<b>  $answer2 </b><br><br>
			  		Answer 3 is one of these: <b> $answer3</b> <br><br>";
			  }
			 ?>
		</div>
	</body>
</html>