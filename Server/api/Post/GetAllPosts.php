<?php 

    include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/CrudLibraries.php");
	include_once("../../Utils/Libraries/PostLibraries.php");

    $responseDTO = new ResponseDTO();
	
	try 
	{
		$postBLL = new PostBLL();
		$responseDTO = $postBLL->GetAllItems();
	} 
	catch (Throwable $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
	}
    
	echo json_encode($responseDTO);

?>