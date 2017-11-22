<?php 
    
    include_once("../../Utils/Libraries/headers.php");
    include_once("../../Utils/Libraries/CoreLibraries.php");
    include_once("../../Utils/Libraries/CrudLibraries.php");
	include_once("../../Utils/Libraries/LoginLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
		$requestJson = file_get_contents("php://input");
		$commonValidationsService = new CommonValidationsService();

		$responseDTO = $commonValidationsService->ValidateDataEncrypted($requestJson);
		if($responseDTO->HasError)
		{
			echo json_encode($responseDTO);
			return;
		}

		$loginBLL = new LoginBLL();
		$responseDTO = $loginBLL->SignIn($responseDTO->ResultData);
	} 
	catch (Exception $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema autenticando el usuario.", $e->getMessage());		
	}
    
	echo json_encode($responseDTO);
?>