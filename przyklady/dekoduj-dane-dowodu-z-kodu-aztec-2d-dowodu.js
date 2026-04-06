//
// załącz moduł dekodera dla Node.js
//
import { AZTecDecoder } from "aztec-decoder";

// inicjalizuj dekoder (używamy naszego klucza licencyjnego do inicjalizacji)
const decoder = new AZTecDecoder("ABCD-ABCD-ABCD-ABCD");

//
// 2. Dekoduj dane bezpośrednio z pliku graficznego i zwróć wynik jako rozkodowaną tablicę elementów JSON
//
const resultPng = await decoder.decodeImageFromFile("C:\\zdjecie-kodu-aztec-2d.png");

if (resultPng) {
    console.log(JSON.stringify(resultPng, null, "\t"));
}
