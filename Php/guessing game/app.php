<?php
class Player {
	private $guesses = 0;
	private $score=0;
	
	function reset(){
		$this -> score = 0;
		$this -> guesses = 0;
		
	}
	function update_score($val) {
		$this -> score += $val;
		return $this -> score;
	}
	
	function update_guesses() {
		$this ->guesses += 1;
		return $this -> guesses;
	}
	function ret_score(){
		if (!$this->score) {
			$this->score = 0;
		}
		return $this->score;
	}
	
	function ret_guesses() {
		return $this ->guesses;
	}

}

function movie_info($pass) {
	$genre_array = $cast_array = array();
	$connect = mysql_connect('localhost', 'imdb', $pass);
	mysql_SELECT_db('imdb');
	$movie_info_query = "SELECT title.id,title.title, title.production_year,GROUP_CONCAT( DISTINCT movie_info.info) as genre FROM 
							movie_info,title JOIN (SELECT (RAND() * (SELECT MAX(id) FROM title)) AS id) AS rand
							WHERE title.id >= rand.id AND title.id = movie_info.movie_id  
							AND title.production_year > 2000 AND movie_info.info_type_id = 3";

	$info = mysql_query($movie_info_query);
	$line = mysql_fetch_row($info);
	
	$movie_id = $line[0]; 
	$title = $line[1];
	$production_year = $line[2];
	$genre = $line[3];
	$genre_array = explode(',', $genre);
	
	$cast_query = "Select name.name as names 
				   FROM cast_info,name 
				   WHERE movie_id = $movie_id 
				   AND cast_info.person_id = name.id";
				   
	$cast_info = mysql_query($cast_query);
	if ($cast_info) {
		while ($line = mysql_fetch_array($cast_info)) {
			array_push($cast_array, $line['names']);
			}
		}
	mysql_close();
	//text = 5 point question, array_1 for 3 point question, array_2 for 2 point question
	$data = array('title' =>$title, 'text' => $production_year,'array_1'=>$cast_array,'array_2' =>$genre_array);
	return $data;
	
}

function actor_info($pass) {
	$movies_array = $characters_array = array();
	$connect = mysql_connect('localhost', 'imdb', $pass);
	mysql_SELECT_db('imdb');
	$actor_info_query = "SELECT name.id,name.name FROM name
							JOIN (SELECT (RAND() * (SELECT MAX(id) FROM name)) AS id) AS rand 
							WHERE name.id >= rand.id limit 1";

	$result = mysql_query($actor_info_query);
	$line = mysql_fetch_row($result);
	$person_id = $line[0]; 
	$person_name = $line[1];
	
	$movie_count_query = "SELECT count(person_id) as count FROM cast_info WHERE person_id = $person_id";
	$result = mysql_query($movie_count_query);
	$line = mysql_fetch_row($result);
	$count = $line[0];
	
	$movies_char_query = "SELECT char_name.name,title.title 
				   FROM cast_info,title,char_name 
				   WHERE cast_info.person_id = $person_id 
				   AND cast_info.movie_id=title.id AND person_role_id = char_name.id;";
				   
	$cast_movie_info = mysql_query($movies_char_query);
	while ($line = mysql_fetch_array($cast_movie_info)) {
		array_push($characters_array, $line['name']);
		array_push($movies_array, $line['title']);

	}
	mysql_close();
	//text = 5 point question, array_1 for 3 point question, array_2 for 2 point question
	$data = array('title' =>$person_name, 'text' => $count,'array_1'=>$characters_array,'array_2' =>$movies_array);
	return $data;
}

function company_info($pass) {
	$movie_amount = $genre_array = array();
	$connect = mysql_connect('localhost', 'imdb', $pass);
	mysql_SELECT_db('imdb');
	$company_info_query = "SELECT company_id,company_name.name,company_type.kind  
							FROM movie_companies JOIN company_name ON movie_companies.company_id = company_name.id 
							JOIN company_type ON movie_companies.company_type_id = company_type.id 
							JOIN (SELECT (RAND() * (SELECT MAX(id) FROM movie_companies)) AS id) AS rand 
							WHERE movie_companies.id >= rand.id limit 1;";

	$info = mysql_query($company_info_query);
	$line = mysql_fetch_row($info);
	
	$company_id = $line[0]; 
	$title = $line[1];
	$type_company = $line[2];

	$company_movies_query = "SELECT count(movie_id) AS count FROM movie_companies WHERE company_id = $company_id";
	$cast_info = mysql_query($company_movies_query);
	if ($cast_info) {
	while ($line = mysql_fetch_array($cast_info)) {
		array_push($movie_amount, $line['count']);
			}
	}

	mysql_close();
	//text = 5 point question, array_1 for 3 point question, array_2 for 2 point question
	$data = array('title' =>$title, 'text' => $type_company,'array_1'=>$movie_amount,'array_2' =>$genre_array);
	return $data;

}



?>