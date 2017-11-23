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
            
        }
    }

?>