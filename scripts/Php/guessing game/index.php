<?php 
/*
Antonio Perez 
CSCI 130 proj3
ID 22


*/
include_once("app.php");
session_start();
if (isset($_POST['dbpass'])) {
	$pass = $_POST['dbpass'];
	$connect = mysql_connect('localhost', 'imdb', $pass);
	if($connect){
		$_SESSION['pass'] = $pass;
		mysql_close();
	}
	else {
		header('Location: login.html');	
	}
}
if (!isset($_SESSION['pass'])) {
	header('Location: login.html');
}

if (!isset($_SESSION['player'])) {
	$_SESSION['player'] = new Player();
}

$score = $_SESSION['player']->ret_score();
$guesses = $_SESSION['player']->ret_guesses();
$total_guesses = 5;

$_SESSION["total_guesses"] = $total_guesses;

if ($guesses >= $total_guesses) {
	header('Location: results.php');
}




?>

<!DOCTYPE html>
<html>
	<head>

		<link href="static/css/proj3.css" rel="stylesheet" type="text/css"/>
		<script src="static/js/proj3.js"></script>

	</head>
	<body class="backcolor">	
			<p>Want to play a game? A guessing game? Get the highest score possible with just <?php echo $total_guesses; ?> guesses. 
				<br>You will be able to choose a category, then pick a question you would like to answer under that category.
				<br /> The entities to guess about will be choosen at random from Movies, Actors, or Movie Companies; depending on the category. 
				<br> Questions are worth 5,3, or 2 points. 
				</p>	
		<div align="center" > 

			<label >Your Current Score: <?php echo $score; ?></label>
			<br />
			<label >Total Guesses: <?php echo $guesses."/".$total_guesses; ?></label>
			<br /> <br />
			
			<label><u>Select a Category</u> </label> <br /><br>
			<form method="post" action="questions.php">
				<button class="btn-block"  onclick="submit_form(this);return false;">Movie/Shows
					<input type="hidden" name="choice" value="movie" /></button>
			</form>
			<br>
			<form method="post" action="questions.php">
			<button class="btn-block " onclick="submit_form(this);return false;">Actors
				<input type="hidden" name="choice"value="actor"/></button>
				</form>
			<br>
			<form method="post" action="questions.php">
			<button class="btn-block" onclick="submit_form(this);return false;" >Companies
				<input type="hidden" name="choice" value="company" /></button>
				</form>
			<br />
			
		</div>

	</body>
</html>