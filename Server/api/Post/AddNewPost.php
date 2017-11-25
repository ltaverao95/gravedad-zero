<?php 
    
    include_once("../../Utils/Libraries/headers.php");
    include_once("../../Utils/Libraries/CoreLibraries.php");
	include_once("../../Utils/Libraries/CrudLibraries.php");
	include_once("../../Utils/Libraries/PostLibraries.php");

	$responseDTO = new ResponseDTO();
	
	try 
	{
        $postDTO = new PostDTO();
        $postDTO->Title = $_POST["title"];
        $postDTO->PostType = $_POST["post_type"];

        $postDTO->UserDTO = new UserDTO();
        $postDTO->UserDTO->Id = $_POST["id_user"];

        $postDTO->PostDetailDTO = new PostDetailDTO();
		$postDTO->PostDetailDTO->Message = $_POST["message"];
		$postDTO->PostDetailDTO->DatePublished = $_POST["date_published"];
		
		if(!empty($_FILES['photo']))
		{
			$postDTO->PostDetailDTO->PhotoUrl = $_FILES['photo'];
		}

		$postBLL = new PostBLL();
		$responseDTO = $postBLL->AddNewItem($postDTO);
	} 
	catch (Throwable $e) 
	{
		$responseDTO->SetErrorAndStackTrace("Ocurrió un problema autenticando el usuario.", $e->getMessage());		
	}
    
	echo json_encode($responseDTO);
?>