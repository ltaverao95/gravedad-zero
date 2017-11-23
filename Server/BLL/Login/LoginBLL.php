<?php 
    class LoginBLL implements ICRUDOperationServices
    {
        public function SignIn($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->ValidateCurrentUser($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $loginDAL = new LoginDAL();
                $responseDTO = $loginDAL->SignIn($userDTO);
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }
            return $responseDTO;
        }

        public function SignOut()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                session_start();
                session_destroy();
                $responseDTO->UIMessage = "Sesión Finalizada con éxito!";
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
                $loginDAL = new LoginDAL();
                $responseDTO = $this->ValidatePassword($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->UpdateUserPassword($userDTO);
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
                $loginDAL = new LoginDAL();
                $responseDTO = $this->ValidateUserName($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->ValidateUserIfExists($userDTO);
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
                $loginDAL = new LoginDAL();
                $responseDTO = $this->ValidateCompleteUser($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->SaveItem($userDTO);
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
                $loginDAL = new LoginDAL();
                $responseDTO = $loginDAL->GetAllItems();
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
                $loginDAL = new LoginDAL();
                $responseDTO = $this->ValidateCurrentUserID($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->GetItemByID($userDTO);
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
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
                $loginDAL = new LoginDAL();
                $responseDTO = $this->ValidateLoginDTO($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->UpdateItemByID($userDTO);
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema durante la verificación de los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function DeleteAllItems()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $loginDAL = new LoginDAL();
                $responseDTO = $loginDAL->DeleteAllItems();
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        public function DeleteItemByID($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $loginDAL = new LoginDAL();
                $responseDTO = $this->ValidateCurrentUserID($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->DeleteItemByID($userDTO);
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
                $loginDAL = new LoginDAL();
                $responseDTO = $this->ValidateItemsSelected($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                $responseDTO = $loginDAL->DeleteItemsSelected($userDTO);
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se eliminaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }

        //##### Private Methods #####

        private function ValidateCurrentUser($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if ($userDTO == null)
                {
                    $responseDTO->SetError("No hay un usuario para validar");
                    return $responseDTO;
                }

                if($userDTO->UserName == null)
                {
                    $responseDTO->SetError("El campo de usuario no puede estar vacío");
                    return $responseDTO;
                }

                if($userDTO->Password == null)
                {
                    $responseDTO->SetError("El campo de contraseña no puede estar vacío");
                    return $responseDTO;
                }
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateCurrentUserID($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($userDTO->IdUser == null)
                {
                    $responseDTO->SetError("El id no puede estar vacío");
                    return $responseDTO;
                }
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateLoginDTO($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($userDTO->UserDetailDTO->IdentityNumber == null)
                {
                    $responseDTO->SetError("La cédula no puede estar vacía");
                    return $responseDTO;
                }

                if($userDTO->UserDetailDTO->Name == null)
                {
                    $responseDTO->SetError("El nombre de usuario no puede estar vacío");
                    return $responseDTO;
                }
                
                if($userDTO->UserDetailDTO->Surname == null)
                {
                    $responseDTO->SetError("El apellido no puede estar vacío");
                    return $responseDTO;
                }

                if($userDTO->UserDetailDTO->Email == null)
                {
                    $responseDTO->SetError("El correo electrónico no puede estar vacío");
                    return $responseDTO;
                }
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }
            
            return $responseDTO;
        }

        private function ValidateCompleteUser($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->ValidateCurrentUser($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }

                if($userDTO->Role == null)
                {
                    $responseDTO->SetError("No se ha definido el rol del usuario");
                    return $responseDTO;
                }

                $responseDTO = $this->ValidateLoginDTO($userDTO);
                if($responseDTO->HasErrors)
                {
                    return $responseDTO;
                }
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateUserName($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($userDTO->UserName == null)
                {
                    $responseDTO->SetError("El campo de usuario no puede estar vacío");
                    return $responseDTO;
                }
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidatePassword($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($userDTO->Password == null)
                {
                    $responseDTO->SetError("La contraseña no puede estar vacía");
                    return $responseDTO;
                }
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateItemsSelected($userDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if(count($userDTO) == 0 ||
                   $userDTO == null)
                {
                    $responseDTO->SetError("No hay registros para eliminar");
                    return $responseDTO;
                }
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema mientras se validaban los datos", $e->getMessage());	
            }

            return $responseDTO;
        }
    }
?>