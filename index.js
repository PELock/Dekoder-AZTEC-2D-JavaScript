/******************************************************************************
 *
 * Dekoder kodow AZTEC 2D z dowodow rejestracyjnych interfejs Web API
 *
 * Wersja         : AZTecDecoder v1.0
 * Jezyk          : JavaScript dla Node.js
 * Zaleznosci     : request (https://github.com/request/request)
 * Autor          : Bartosz Wójcik (support@pelock.com)
 * Strona domowa  : http://www.dekoderaztec.pl | https://www.pelock.com
 *
 *****************************************************************************/

var request = require('request');
var fs = require("fs");
var path = require("path");

/**
 * @var {string} domyslna koncowka WebApi
 */
var API_URL = "https://www.pelock.com/api/aztec-decoder/v1";

/**
 * @var {string} klucz WebApi do uslugi AZTecDecoder
 */
var _ApiKey = "";

/**
 * Funkcja callback wywolywana po zdekodowaniu danych.
 *
 * @callback decodedCallback
 * @param {?Array} Tablica z odczytanymi wartosciami JSON lub null jesli blad
 */

/**
 * Inicjalizacja klasy AZTecDecoder
 *
 * @param {string} ApiKey Klucz do uslugi WebApi
 */
exports.SetApiKey = function(ApiKey)
{
    _ApiKey = ApiKey;
};

/**
 * Dekodowanie zaszyfrowanej wartosci tekstowej do
 * wyjsciowej tablicy w formacie JSON.
 *
 * @param {string} Text     Odczytana wartosc z kodem AZTEC2D w formie ASCII
 * @returns {?Array} Tablica z odczytanymi wartosciami JSON lub null jesli blad
 * @param {decodedCallback} callback_ Funkcja callback wywolywana po zdekodowaniu danych
 */
exports.DecodeText = function(Text, callback_)
{
    // parametry
    var Params = [];
    Params["command"] = "decode-text";
    Params["text"] = Text;

    return PostRequest(Params, callback_);
};

/**
 * Dekodowanie zaszyfrowanej wartosci tekstowej
 * ze wskaznego pliku do wyjsciowej tablicy z
 * formatu JSON.
 *
 * @param {string} TextFilePath  Sciezka do pliku z odczytana wartoscia kodu AZTEC2D
 * @param {decodedCallback} callback_ Funkcja callback wywolywana po zdekodowaniu danych
 * @returns {?Array} Tablica z odczytanymi wartosciami JSON lub null jesli blad
 */
exports.DecodeTextFromFile = function(TextFilePath, callback_)
{
    fs.readFile(TextFilePath, 'utf8', function(err, data)
    {
        if (err)
        {
            callback_(null);
            return null;
        }

        return exports.DecodeText(data, callback_);
    });

    return null;
};

/**
 * Dekodowanie zaszyfrowanej wartosci zakodowanej
 * w obrazku PNG lub JPG/JPEG do wyjsciowej tablicy
 * w formacie JSON.
 *
 * @param {string} ImageFilePath Sciezka do obrazka z kodem AZTEC2D
 * @param {decodedCallback} callback_ Funkcja callback wywolywana po zdekodowaniu danych
 * @returns {?Array} Tablica z odczytanymi wartosciami JSON lub null jesli blad
 */
exports.DecodeImageFromFile = function DecodeImageFromFile(ImageFilePath, callback_)
{
    // parametry
    var Params = [];
    Params["command"] = "decode-image";
    Params["image"] = ImageFilePath;

    return PostRequest(Params, callback_);
};

/**
 * Wysyla zapytanie POST do serwera WebApi
 *
 * @param {Array} ParamsArray Tablica z parametrami dla zapytania POST
 * @param {decodedCallback} callback_ Funkcja callback wywolywana po zdekodowaniu danych
 * @returns {?Array} Tablica z odczytanymi wartosciami JSON lub null jesli blad
 */
function PostRequest(ParamsArray, callback_)
{
    // czy jest ustawiony klucz Web API?
    if (!_ApiKey)
    {
        callback_(null);
        return null;
    }

    // przygotuj zapytanie POST
    var req = request.post(API_URL, function (error, response, body)
    {
        if (!error && response.statusCode == 200)
        {
            callback_(JSON.parse(body));
        }
        else
        {
            callback_(null);
        }
    });

    var form = req.form();

    // do parametrow dodaj klucz Web API
    form.append("key", _ApiKey);

    // do parametrow dodaj komende
    form.append("command", ParamsArray['command']);

    // ustaw poprawnie element z plikiem
    if ('image' in ParamsArray)
    {
        form.append('image', fs.createReadStream(ParamsArray['image']));
    }
    else
    {
        // do parametrow dodaj komende
        form.append("text", ParamsArray['text']);
    }
}
