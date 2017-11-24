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

        public function GetItemByID($itemDTO)
        {
            
        }

        public function AddNewItem($itemDTO)
        {

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

                $query = "SELECT * FROM post pst ".
                         "INNER JOIN post_detail pst_dtl ON pst.id_post = pst_dtl.id_post;";

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
    }

?>