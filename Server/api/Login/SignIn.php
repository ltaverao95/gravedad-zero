<?php 

    $requestJson = file_get_contents("php://input");
	$requestDTO = json_decode($requestJson);

    echo json_encode(array("test" => "hola"));    

?>