<?php 

    class PostDAL implements ICRUDOperationServices
    {
        //##### ICRUDOperationServices implementation

        public function GetAllItems()
        {
            $responseDTO = new ResponseDTO();
	
            try 
            {
                $responseDTO = $this->GetItems();
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
                $responseDTO = $this->GetItemsByPostType($enumPostType);
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
                $responseDTO = $this->AddPost($itemDTO);
            } 
            catch (Throwable $e) 
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema guardando los datos", $e->getMessage());		
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

        private function GetItems()
        {
            $responseDTO = new ResponseDTO();
            
            try 
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();

                $query = "SELECT * FROM get_posts_with_detail_profile_photo_and_name();";

                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                //Recuperar los registros de la BD
                $result = $dataBaseServicesDAL->Q->fetchAll();	
                $responseDTO = $getDataServiceDAL->GetPostItems($result);
                $dataBaseServicesDAL->connection = null;
            } 
            catch (Throwable $e) 
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
            }

            return $responseDTO;
        }

        private function GetItemsByPostType($enumPostType)
        {
            $responseDTO = new ResponseDTO();
            
            try 
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();

                $query = "SELECT * FROM get_posts_with_detail_profile_photo_and_name_by_post_type(:enumPostType);";
                $dataBaseServicesDAL->ArrayParameters = array(
                    ':enumPostType' => $enumPostType);
                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                //Recuperar los registros de la BD
                $result = $dataBaseServicesDAL->Q->fetchAll();	
                $responseDTO = $getDataServiceDAL->GetPostItems($result);
                $dataBaseServicesDAL->connection = null;
            } 
            catch (Throwable $e) 
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
            }

            return $responseDTO;
        }

        private function AddPost($itemDTO)
        {
            $responseDTO = new ResponseDTO();
            
            try 
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();

                $query = "SELECT add_post_with_detail(:title, :id_user, :post_type, :message, :photo_url, :date_published);";
                $dataBaseServicesDAL->ArrayParameters = array(
                    ':title' => $itemDTO->Title,
                    ':id_user' => $itemDTO->UserDTO->Id,
                    ':post_type' => $itemDTO->PostType,
                    ':message' => $itemDTO->PostDetailDTO->Message,
                    ':photo_url' => $itemDTO->PostDetailDTO->PhotoUrl,
                    ':date_published' => date('Y-m-d'),
                );
                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO->UIMessage = "Publicación guardada con éxito!";
                $dataBaseServicesDAL->connection = null;
            } 
            catch (Throwable $e) 
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema obteniendo los datos", $e->getMessage());		
            }

            return $responseDTO;
        }
    }

?>