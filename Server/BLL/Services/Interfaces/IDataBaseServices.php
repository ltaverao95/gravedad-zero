<?php 

    interface IDataBaseServices
    {
        public function InitializeDataBaseConnection();
        public function ExecuteQuery($query);
    }

?>