import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { ActionResultDTO } from '../../Utils/Services/ActionResultDTO';

@Injectable()
export class AESEncryption {

    private _key: string;
    private _iv: string;

    constructor() {
        this._key = "Gr4V3Dad_Z3R0!";
        this._iv = this._key;
    }

    public EncryptText(textToEncrypt: string): ActionResultDTO {
        let actionResultDTO = new ActionResultDTO();

        try {
            let textEncrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(textToEncrypt), this._key,
                {
                    keySize: 128 / 8,
                    iv: this._iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }
            );

            actionResultDTO.ResultData = textEncrypted.toString();
        }
        catch (e) {
            actionResultDTO.SetError(e.message);
        }

        return actionResultDTO;
    }

    public DecryptText(textToDecrypt: string): ActionResultDTO {
        let actionResultDTO = new ActionResultDTO();

        try {
            let textDecrypted = CryptoJS.AES.decrypt(textToDecrypt, this._key,
                {
                    keySize: 128 / 8,
                    iv: this._iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }
            );

            actionResultDTO.ResultData = textDecrypted.toString(CryptoJS.enc.Utf8);
        }
        catch (e) {
            actionResultDTO.SetError(e.message);
        }

        return actionResultDTO;
    }
}