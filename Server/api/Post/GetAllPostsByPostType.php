<?php 
    
    include_once("../../Utils/Libraries/headers.php");
    include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/CrudLibraries.php");
	include_once("../../Utils/Libraries/PostLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$requestJson = file_get_contents("php://input");
		$requestObj = json_decode($requestJson);

		$postBLL = new PostBLL();
		$responseDTO = $postBLL->GetAllPostsByPostType($requestObj->enumPostType);
	} 
	catch (Throwable $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema autenticando el usuario.", $e->getMessage());		
	}
    
	echo json_encode($responseDTO);
?>