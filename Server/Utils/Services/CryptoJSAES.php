<?php

class CryptoJSAES {

    private $passphrase = "Gr4V3Dad_Z3R0!";

    /**
     * @param      $data
     * @param null $salt        ONLY FOR TESTING
     * @return string           encrypted data in base64 OpenSSL format
     */
    public function encrypt($data, $salt = null) {
        $salt = $salt ?: openssl_random_pseudo_bytes(8);
        list($key, $iv) = self::evpkdf($this->passphrase, $salt);
        $ct = openssl_encrypt($data, 'aes-256-cbc', $key, true, $iv);
        return self::encode($ct, $salt);
    }

    /**
     * @param string $base64        encrypted data in base64 OpenSSL format
     * @return string
     */
    public function decrypt($base64) {
        list($ct, $salt) = self::decode($base64);
        list($key, $iv) = self::evpkdf($this->passphrase, $salt);
        $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
        return $data;
    }

    public function evpkdf($passphrase, $salt) {
        $salted = '';
        $dx = '';
        while (strlen($salted) < 48) {
            $dx = md5($dx . $passphrase . $salt, true);
            $salted .= $dx;
        }
        $key = substr($salted, 0, 32);
        $iv = substr($salted, 32, 16);
        return [$key, $iv];
    }

    public function decode($base64) {
        $data = base64_decode($base64);
        if (substr($data, 0, 8) !== "Salted__") {
            throw new \InvalidArgumentException();
        }
        $salt = substr($data, 8, 8);
        $ct = substr($data, 16);
        return [$ct, $salt];
    }

    public function encode($ct, $salt) {
        return base64_encode("Salted__" . $salt . $ct);
    }
}
