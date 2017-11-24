<?php 
    class GetDataServiceDAL implements IGetDataServiceDAL
    {
        //########## Public Methods

        public function GetUserItem($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO == NULL)
                {
                    $responseDTO->SetError("Usuario y/o contraseña inválidos, intente de nuevo.");
                    return $responseDTO;
                }

                $userDTO = new UserDTO();
                $userDTO->Id = $itemDTO["id_user"];
                $userDTO->UserName = $itemDTO["user_name"];
                $userDTO->Password = $itemDTO["password"];
                $userDTO->Role = $itemDTO["role"];
                $userDTO->UserDetail = new UserDetailDTO();
                $userDTO->UserDetail->IdUserDetail = $itemDTO["id_user_detail"];
                $userDTO->UserDetail->Name = $itemDTO["name"];
                $userDTO->UserDetail->Surname = $itemDTO["surname"];
                $userDTO->UserDetail->Email = $itemDTO["email"];
                $userDTO->UserDetail->IdUser = $itemDTO["id_user"];
                $userDTO->UserDetail->ProfilePhoto = $itemDTO["profile_photo"];

                $responseDTO->ResultData = $userDTO;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }
            return $responseDTO;
        }

        public function GetPostItems($itemDTO)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($itemDTO == null)
                {
                    $responseDTO->UIMessage = "No se encontraron resultados";
                    return $responseDTO;
                }

                $itemsList = array();
                while ($row = array_shift($itemDTO)) 
                {
                    $postDTO = new PostDTO();
                    $postDTO->Id = $row['id_post'];
                    $postDTO->Title = $row['title'];
                    $postDTO->PostType = $row['post_type'];
                    $postDTO->ImageURL = $row['id_user'];
                    
                    $postDTO->PostDetailDTO = new PostDetailDTO();
                    $postDTO->PostDetailDTO->IdPostDetail = $row['id_post_detail'];
                    $postDTO->PostDetailDTO->Message = $row['message'];
                    $postDTO->PostDetailDTO->PhotoUrl = $row['photo_url'];
                    $postDTO->PostDetailDTO->DatePublished = $row['date_published'];
                    $postDTO->PostDetailDTO->IdPost = $row['id_post'];

                    array_push($itemsList, $postDTO);
                }

                if($itemsList == null)
                {
                    $responseDTO->UIMessage = "No se encontraron registros para mostrar";
                    return $responseDTO;
                } 
                
                $responseDTO->ResultData = $itemsList;
            }
            catch (Throwable $e)
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema tratando de obtener los datos", $e->getMessage());
            }
            return $responseDTO;
        }
    }
?>