<?php 

    interface IDataBaseServicesDAL
    {
        public function InitializeDataBaseConnection();
        public function ExecuteQuery($query);
    }

?>