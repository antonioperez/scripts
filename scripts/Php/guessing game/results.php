<?php
include_once ("app.php");
session_start();
if (!$_SESSION['pass'] || !$_SESSION['player']) {
	header('Location: login.html');
}

$status = "";
$guesses = $_SESSION['player'] -> ret_guesses();

$_SESSION['player'] -> update_guesses();
if (isset($_POST['input'])) {
	$data = $_SESSION['data'];
	if ($_POST['input'] == 5) {
		if ($_POST['answer'] == $data['text']) {
			$status = "correct";
			$_SESSION['player'] -> update_score($_POST['input']);
		} else {
			$status = "wrong";
		}
	} elseif ($_POST['input'] == 3) {
		$answer = ucfirst(strtolower($_POST['answer']));
		if (in_array($answer, $data['array_1'])) {
			$status = "correct";
			$_SESSION['player'] -> update_score($_POST['input']);
		} else {
			$status = "wrong";
		}
	} elseif ($_POST['input'] == 2) {
		$answer = ucfirst(strtolower($_POST['answer']));
		if (in_array($answer, $data['array_2'])) {
			$status = "correct";
			$_SESSION['player'] -> update_score($_POST['input']);
		} else {
			$status = "wrong";
		}
	}
	unset($_SESSION['data']);
}

$result = "";
if ($guesses >= $_SESSION["total_guesses"]) {
	$score = $_SESSION['player'] -> ret_score();
	$_SESSION['player'] -> reset();
	$result = "You got a score of $score";

}
?>

<!DOCTYPE html>
<html>
	<head>
		<link href="static/css/proj3.css" rel="stylesheet" type="text/css"/>
		<script src="static/js/proj3.js"></script>
	</head>
	<body>
		<div align="center" class="backcolor">
			<a href='index.php'>Select another category! </a>
			<?php
			if (!$result) {
				if ($status == 'correct') {
					echo "You're correct!
<a href='index.php'>Select another category! </a>";
				} elseif ($status == 'wrong') {
					echo "WRONG!";
				}
			} else {
				echo $result;
			}
			?>
		</div>
	</body>
</html>