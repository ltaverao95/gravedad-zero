<?php 

    interface ICRUDOperationServices
    {
        public function GetAllItems();
        public function GetItemByID($itemDTO);
        public function AddNewItem($itemDTO);
        public function UpdateItemByID($itemDTO);
        public function DeleteAllItems();
        public function DeleteItemByID($itemDTO);
    }

?>