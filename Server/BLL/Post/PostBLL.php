<?php 

    class PostBLL implements ICRUDOperationServices
    {
        //##### ICRUDOperationServices implementation

        public function GetAllItems()
        {
            $responseDTO = new ResponseDTO();
	
            try 
            {
                $postDAL = new PostDAL();
                $responseDTO = $postDAL->GetAllItems();
            } 
            catch (Throwable $e) 
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
            }

            return $responseDTO;
        }

        public function GetAllPostsByPostType($enumPostType)
        {
            $responseDTO = new ResponseDTO();
            
            try 
            {
                $postDAL = new PostDAL();
                $responseDTO = $postDAL->GetAllPostsByPostType($enumPostType);
            } 
            catch (Throwable $e) 
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
            }

            return $responseDTO;
        }

        public function GetItemByID($itemDTO)
        {
            
        }

        public function AddNewItem($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            
            try 
            {
                if(!empty($itemDTO->PostDetailDTO->PhotoUrl))
                {
                    $responseDTO = $this->ValidateImageContent($itemDTO);
                    if($responseDTO->HasErrors)
                    {
                        return $responseDTO;
                    }
                }

                $postDAL = new PostDAL();
                $responseDTO = $postDAL->AddNewItem($itemDTO);
            } 
            catch (Throwable $e) 
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema validando los datos", $e->getMessage());		
            }

            return $responseDTO;
        }

        public function UpdateItemByID($itemDTO)
        {

        }

        public function DeleteAllItems()
        {

        }

        public function DeleteItemByID($itemDTO)
        {

        }

        //##### Private methods
        private function ValidateImageContent($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            try
            {
                if($itemDTO->PostDetailDTO->PhotoUrl['size'] > 10485760)
                {
                    $responseDTO->SetMessageError("La imagen subida no puede ser mayor de 10Mb");
                    return $responseDTO;
                }
                
                if($itemDTO->PostDetailDTO->PhotoUrl['tmp_name'] == "")
                {
                    $responseDTO->SetMessageError("No hay una imagen para cargar");
                    return $responseDTO;
                }
                
                $guid = bin2hex(openssl_random_pseudo_bytes(10));
                $imageContent = file_get_contents($itemDTO->PostDetailDTO->PhotoUrl['tmp_name']);
                $fileName = $guid . "__" . $itemDTO->PostDetailDTO->PhotoUrl['name'];
		        $fileUrl = "Server/App_Data/Post/".$fileName;
                $fp = fopen("../../App_Data/Post/".$fileName, "w");
                fwrite($fp, $imageContent);
                fclose($fp);
                $itemDTO->PostDetailDTO->PhotoUrl = $fileUrl;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to get content from image", $e->getMessage());
            }
            return $responseDTO;
        }
    }

?>