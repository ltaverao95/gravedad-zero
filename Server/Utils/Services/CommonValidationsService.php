<?php 

    class CommonValidationsService
    {
        private $_cryptoJSAES = null;

        public function ValidateDataEncrypted($data)
        {
            $responseDTO = new ResponseDTO();
            
            try 
            {
                if(!$data)
                {
                    $responseDTO->SetError("Actualmente no hay datos");
                    return $responseDTO;
                }

                $this->_cryptoJSAES = new CryptoJSAES();

                $decryptResult = $this->_cryptoJSAES->decrypt($data);

                if(!$decryptResult)
                {
                    $responseDTO->SetError("Datos inválidos");
                    return $responseDTO;
                }

                $responseDTO->ResultData = json_decode($decryptResult);
            } 
            catch (Exception $e) 
            {
                $responseDTO->SetErrorAndStackTrace("Ocurrió un problema Validando la encripción de los datos", $e->getMessage());		
            }

            return $responseDTO;
        }
    }

?>