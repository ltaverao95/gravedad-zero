<?php 
    class LoginDAL implements ICRUDOperationServices
    {
        public function SignIn($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->ValidateCurrentUser($userDTO);
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function UpdateUserPassword($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->UpdateCurrentUserPassword($userDTO);
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function ValidateUserIfExists($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->ValidateCurrentUserIfExists($userDTO);
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        //##### ICRUDOperationServices implementations #####

        public function SaveItem($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->SaveCurrentUser($userDTO);
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function GetAllItems()
        {
            $responseDTO = new ResponseDTO();
            
            try
            {
                $responseDTO = $this->GetUsers();   
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante el guardado de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function GetItemByID($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->GetCurrentLoggedUser($userDTO);   
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function AddNewItem($userDTO)
        {
            
        }

        public function UpdateItemByID($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->UpdateCurrentLoggedUser($userDTO);   
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de actualizar los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function DeleteAllItems()
        {
            $responseDTO = new ResponseDTO();
            
            try
            {
                $responseDTO = $this->DeleteCurrentItems();
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO = $this->ValidateLastRecordToResetAutoIncement();
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO->UIMessage = "Registros eliminados!";
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la eliminación de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function DeleteItemByID($userDTO)
        {
            $responseDTO = new ResponseDTO();
            
            try
            {
                $responseDTO = $this->DeleteCurrentItem($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO = $this->ValidateLastRecordToResetAutoIncement();
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO->UIMessage = "Registro eliminado!";
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }
            return $responseDTO;
        }

        public function DeleteItemsSelected($userDTO)
        {
            $responseDTO = new ResponseDTO();
            
            try
            {
                $responseDTO = $this->DeleteCurrentItemsSelected($userDTO);      
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO = $this->ValidateLastRecordToResetAutoIncement();
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                if(count($userDTO) > 1)
                {
                    $responseDTO->UIMessage = "Registros eliminados!";
                }
                else
                {
                    $responseDTO->UIMessage = "Registro eliminado!";
                }
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function ValidateLastRecordToResetAutoIncement()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();
                $query = "SELECT * FROM login";
                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }
                //Recuperar los registros de la BD
                $result = $dataBaseServicesDAL->Q->fetchAll();	
                if($result == null)
                {
                    $query = "ALTER TABLE login AUTO_INCREMENT = 1";
                    $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                    if($responseDTO->HasErrors)
                    {
                        return $responseDTO;
                    }

                    $query = "ALTER TABLE user_logued_inf";
                    $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                    if($responseDTO->HasErrors)
                    {
                        return $responseDTO;
                    }
                } 
            }
            catch (Throwable $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("Ocurrió un error tratando de validar los registros", $e->getMessage());
            }

            return $responseDTO;
        }

        //######### Private Methods

        private function ValidateCurrentUser($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();
                $encryptionService = new CryptoJSAES();

                $query = "SELECT * FROM public.\"user\" usr ".
                         "INNER JOIN user_detail usr_dtl ON usr.id_user = usr_dtl.id_user ".
                         "WHERE usr.user_name = :user_name AND password = :password;";
                $dataBaseServicesDAL->ArrayParameters = array(
                    ':user_name' => $userDTO->UserName, 
                    ':password' =>$userDTO->Password);
                    
                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                //Recuperar los registros de la BD
                $result = $dataBaseServicesDAL->Q->fetch(PDO::FETCH_ASSOC);
                $responseDTO = $getDataServiceDAL->GetUserItem($result);
                $dataBaseServicesDAL->connection = null;
                
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO->ResultData = $encryptionService->encrypt(json_encode($responseDTO->ResultData));
                $dataBaseServicesDAL->connection = null;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function GetCurrentLoggedUser($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();

                $query = "SELECT user_logued_inf.*, login_user.* FROM user_logued_info user_logued_inf inner join login login_user on user_logued_inf.id_login_user = login_user.id_login_user WHERE login_user.id_login_user = :id_login_user";
                
                $dataBaseServicesDAL->ArrayParameters = array(
                    ':id_login_user' => $userDTO->IDLoginUser);

                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

        		//Recuperar los registros de la BD
                $result = $dataBaseServicesDAL->Q->fetchAll();	
                $responseDTO = $getDataServiceDAL->GetLoggedUserItems($result);
                $dataBaseServicesDAL->connection = null;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function UpdateCurrentLoggedUser($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();
                $query = 
                "SET foreign_key_checks = 0; ".
                "UPDATE login ".
                "SET id_login_user = :id_login_user, ".
                "    user_name = :user_name, ".
                "    password = :password, ".
                "    role = :role ".
                "WHERE id_login_user = :id_login_user; ".
                "UPDATE user_logued_info ".
                "SET id_login_user = :id_login_user, ".
                "    identity_card = :identity_card, ".
                "    name = :name, ".
                "    surname = :surname, ".
                "    phone = :phone, ".
                "    email = :email ".
                "WHERE id_login_user = :id_login_user; ".
                "SET foreign_key_checks = 1;";
                $dataBaseServicesDAL->ArrayParameters = array(
                    ':id_login_user' => $userDTO->IDLoginUser,
                    ':user_name' => $userDTO->UserName,
                    ':password' => $userDTO->Password,
                    ':role' => $userDTO->Role,
                    ':identity_card' => $userDTO->UserAdminModel->IdentityCard,
                    ':name' => $userDTO->UserAdminModel->Name,
                    ':surname' => $userDTO->UserAdminModel->Surname,
                    ':phone' => $userDTO->UserAdminModel->Phone,
                    ':email' => $userDTO->UserAdminModel->Email
                );
                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }
                $responseDTO->UIMessage = "Registro actualizado!";
                $dataBaseServicesDAL->connection = null;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se actualizaban de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function DeleteCurrentItem($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();
                $query = "DELETE user_logued_inf.*, login_user.* ".
                "FROM user_logued_info user_logued_inf ".
                "inner join login login_user on user_logued_inf.id_login_user = login_user.id_login_user ".
                "WHERE user_logued_inf.id_login_user = :id_login_user";
                $dataBaseServicesDAL->ArrayParameters = array(
                    ':id_login_user' => $userDTO->IDLoginUser
                );
                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

        		$responseDTO->UIMessage = "Registro eliminado!";
                $dataBaseServicesDAL->connection = null;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function DeleteCurrentItems()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();
                $query = "TRUNCATE TABLE user_logued_info";
                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }
                $query = "DELETE FROM login;";
                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }
                $dataBaseServicesDAL->connection = null;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se borraban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        private function GetUsers()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();
                $query = "SELECT user_logued_inf.*, login_user.* ".
                "FROM user_logued_info user_logued_inf ".
                "inner join login login_user on user_logued_inf.id_login_user = login_user.id_login_user";
                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }
                //Recuperar los registros de la BD
                $result = $dataBaseServicesDAL->Q->fetchAll();	
                $responseDTO = $getDataServiceDAL->GetLoggedUserItems($result);
                $dataBaseServicesDAL->connection = null;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la obtención de los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        private function SaveCurrentUser($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $query = "INSERT INTO login ".
                "SET id_login_user = :id_login_user, ".
                "user_name = :user_name, ".
                "password = :password, ".
                "role = :role; ".
                "INSERT INTO user_logued_info ".
                "SET id_login_user = LAST_INSERT_ID(), ".
                "identity_card = :identity_card, ".
	            "name = :name, ".
                "surname = :surname, ".
                "phone = :phone, ".
                "email = :email;";
                $dataBaseServicesDAL->ArrayParameters = array(
                    ':id_login_user' => NULL, 
                    ':user_name' => $userDTO->UserName,
                    ':password' => $userDTO->Password,
                    ':role' => $userDTO->Role,
                    ':identity_card' => $userDTO->UserAdminModel->IdentityCard,
                    ':name' => $userDTO->UserAdminModel->Name,
                    ':surname' => $userDTO->UserAdminModel->Surname,
                    ':phone' => $userDTO->UserAdminModel->Phone,
				    ':email' => $userDTO->UserAdminModel->Email);
                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }
        		$responseDTO->UIMessage = "Usuario creado!";
                $dataBaseServicesDAL->connection = null;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la creación del usuario", $e->getMessage());	
            }

            return $responseDTO;
        }

        private function ValidateIfCurrentUserIsAdminRole($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->GetCurrentLoggedUser($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }
                if($responseDTO->ResultData[0]->Role == "admin")
                {
                    $responseDTO->SetError("No puedes eliminar tu propia cuenta de administrador");
                    return $responseDTO;
                }
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateCurrentUserIfExists($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();

                $query = "SELECT * FROM public.\"user\" WHERE user_name = :user_name";
                $dataBaseServicesDAL->ArrayParameters = array(
                    ':user_name' => $userDTO->UserName);

                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }
        		$rowUser = $dataBaseServicesDAL->Q->fetch();
		
                if($rowUser != NULL)
                {
                    $responseDTO->SetError("El usuario: " . $userDTO->UserName . " actualmente ya existe");
                    return $responseDTO;
                }
                
                $responseDTO->UIMessage = "Usuario disponible!";
                $dataBaseServicesDAL->connection = null;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function UpdateCurrentUserPassword($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();
                $responseDTO = $this->GetCurrentLoggedUser($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }
                if($responseDTO->ResultData[0]->Password === $userDTO->Password)
                {
                    $responseDTO->SetError("La contraseña no puede ser igual a la anterior");
                    return $responseDTO;
                }
                $query = 
                "UPDATE login ".
                "SET password = :password ".
                "WHERE id_login_user = :id_login_user; ";
                $dataBaseServicesDAL->ArrayParameters = array(
                    ':id_login_user' => $userDTO->IDLoginUser,
                    ':password' => $userDTO->Password
                );
                $responseDTO = $dataBaseServicesDAL->ExecuteQuery($query);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }
                $responseDTO->UIMessage = "Contraseña actualizada!";
                $dataBaseServicesDAL->connection = null;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se actualizaban de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function DeleteCurrentItemsSelected($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesDAL = new DataBaseServicesDAL();
                $getDataServiceDAL = new GetDataServiceDAL();
                for ($i=0; $i < count($userDTO); $i++) 
                {
                    $responseDTO = $this->DeleteCurrentItem($userDTO[$i]);
                    if($responseDTO->HasErrors)
                    {
                        return $responseDTO;
                    }
                }

                $dataBaseServicesDAL->connection = null;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }
            
            return $responseDTO;
        }
    }
?>