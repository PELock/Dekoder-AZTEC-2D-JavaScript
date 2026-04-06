//
// importuj moduł Dekoder AZTec dla Node.js
//
import { AZTecDecoder } from "aztec-decoder";

// inicjalizuj dekoder (używamy naszego klucza licencyjnego do inicjalizacji)
const decoder = new AZTecDecoder("ABCD-ABCD-ABCD-ABCD");

//
// Dekoduj dane bezpośrednio z pliku graficznego, zwróć wynik jako rozkodowaną tablicę elementów JSON
//
const resultImage = await decoder.decodeImageFromFile("C:\\zdjecie-dowodu.jpg");

// czy udało się zdekodować dane?
if (resultImage?.Status === true) {
    // wyświetl rozkodowane dane (są zapisane jako rozkodowana tablica elementów JSON)
    console.log(JSON.stringify(resultImage, null, "\t"));
}
