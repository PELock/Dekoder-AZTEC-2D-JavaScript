/******************************************************************************
 *
 * Dekoder kodow AZTEC 2D z dowodow rejestracyjnych interfejs Web API
 *
 * Wersja         : AZTecDecoder v2.0
 * Jezyk          : JavaScript (ESM) dla Node.js >= 18
 * Zaleznosci     : brak (wykorzystuje wbudowane fetch i FormData)
 * Autor          : Bartosz Wójcik (support@pelock.com)
 * Strona domowa  : https://www.dekoderaztec.pl | https://www.pelock.com
 *
 *****************************************************************************/

import { readFile, access } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { constants } from "node:fs";
import { Blob } from "node:buffer";

const API_URL = "https://www.pelock.com/api/aztec-decoder/v1";

export class AZTecDecoder {

    /** @type {string} */
    #apiKey;

    /**
     * @param {string} apiKey Klucz do uslugi WebApi
     */
    constructor(apiKey) {
        this.#apiKey = apiKey;
    }

    /**
     * Dekodowanie zaszyfrowanej wartosci tekstowej do
     * wyjsciowej tablicy w formacie JSON.
     *
     * @param {string} text Odczytana wartosc z kodem AZTEC2D w formie ASCII
     * @returns {Promise<Object|null>} Obiekt z odczytanymi wartosciami JSON lub null jesli blad
     */
    async decodeText(text) {
        const params = {
            command: "decode-text",
            text,
        };

        return this.#postRequest(params);
    }

    /**
     * Dekodowanie zaszyfrowanej wartosci tekstowej
     * ze wskazanego pliku do wyjsciowej tablicy
     * w formacie JSON.
     *
     * @param {string} textFilePath Sciezka do pliku z odczytana wartoscia kodu AZTEC2D
     * @returns {Promise<Object|null>} Obiekt z odczytanymi wartosciami JSON lub null jesli blad
     */
    async decodeTextFromFile(textFilePath) {
        try {
            const data = await readFile(textFilePath, "utf8");
            return this.decodeText(data);
        } catch {
            return null;
        }
    }

    /**
     * Dekodowanie zaszyfrowanej wartosci zakodowanej
     * w obrazku PNG lub JPG/JPEG do wyjsciowej tablicy
     * w formacie JSON.
     *
     * @param {string} imageFilePath Sciezka do obrazka z kodem AZTEC2D
     * @returns {Promise<Object|null>} Obiekt z odczytanymi wartosciami JSON lub null jesli blad
     */
    async decodeImageFromFile(imageFilePath) {
        const params = {
            command: "decode-image",
            image: imageFilePath,
        };

        return this.#postRequest(params);
    }

    /**
     * Wysyla zapytanie POST do serwera WebApi
     *
     * @param {Object} params Obiekt z parametrami dla zapytania POST
     * @returns {Promise<Object|null>} Obiekt z odczytanymi wartosciami JSON lub null jesli blad
     */
    async #postRequest(params) {
        if (!this.#apiKey) {
            return null;
        }

        const form = new FormData();

        form.append("key", this.#apiKey);
        form.append("command", params.command);

        if (params.image) {
            try {
                await access(params.image, constants.R_OK);
            } catch {
                return null;
            }

            const fileBuffer = await readFile(params.image);
            const blob = new Blob([fileBuffer]);
            form.append("image", blob, params.image);
        } else {
            form.append("text", params.text);
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: form,
            });

            return await response.json();
        } catch {
            return null;
        }
    }
}

export default AZTecDecoder;
