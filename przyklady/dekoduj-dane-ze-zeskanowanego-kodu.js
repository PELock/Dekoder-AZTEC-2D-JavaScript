//
// importuj moduł Dekoder AZTec dla Node.js
//
import { AZTecDecoder } from "aztec-decoder";

// inicjalizuj dekoder (używamy naszego klucza licencyjnego do inicjalizacji)
const decoder = new AZTecDecoder("ABCD-ABCD-ABCD-ABCD");

//
// Dekoduj dane z odczytanego już ciągu znaków (np. wykorzystując skaner ręczny)
// odczytane dane są w formacie Base64
//
// zakodowane dane z dowodu rejestracyjnego
const szValue = "ggMAANtYAAJD...";

const resultText = await decoder.decodeText(szValue);

if (resultText) {
    console.log(JSON.stringify(resultText, null, "\t"));
}
