<?php 
    
    include_once("../../Utils/Libraries/headers.php");
    include_once("../../Utils/Libraries/CoreLibraries.php");
    include_once("../../Utils/Libraries/CrudLibraries.php");
    include_once("../../Utils/Libraries/LoginLibraries.php");

    $responseDTO = new ResponseDTO();
	
	try 
	{
		$requestJson = file_get_contents("php://input");
        $requestDTO = json_decode($requestJson);

        $responseDTO->ResponseData = $requestDTO;
        
        //$dbh = new PDO('pgsql:user=postgres dbname=database_test password=felipe0025; host=localhost');
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema autenticando el usuario.", $e->getMessage());		
	}
    
	echo json_encode($responseDTO);
?>