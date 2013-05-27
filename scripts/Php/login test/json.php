<?php
		$url = "ilearn-devl.learn.fresnostate.edu/apps/reg/json/";
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
		
?>
