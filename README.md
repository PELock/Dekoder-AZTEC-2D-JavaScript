# Dekoder Kodu AZTEC 2D z Dowodu Rejestracyjnego dla JavaScript i Node.js

[![NPM Version](https://img.shields.io/npm/v/aztec-decoder)](https://www.npmjs.com/package/aztec-decoder)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success)]()

Oferujemy Państwu usługę Web API pozwalającą zdekodować dane z kodu AZTEC 2D zapisanego w dowodach rejestracyjnych pojazdów samochodowych.

![Dekodowanie kodu AZTEC 2D do formatu JSON](dekoder-aztec-2d-workflow.png)

Nasza biblioteka dekoduje dane z dowodu rejestracyjnego, zapisane w postaci kodu obrazkowego tzw. kod aztec. Dekodowane są wszystkie wymienione pola w dowodzie rejestracyjnym pojazdu.

https://www.pelock.com/pl/produkty/dekoder-aztec

---

## Szybki start

```bash
npm install aztec-decoder
```

```javascript
import { AZTecDecoder } from "aztec-decoder";

const decoder = new AZTecDecoder("ABCD-ABCD-ABCD-ABCD");

const result = await decoder.decodeImageFromFile("zdjecie-dowodu.jpg");

if (result?.Status === true) {
    console.log(JSON.stringify(result, null, "\t"));
}
```

---

## Wymagania

- **Node.js >= 18** (biblioteka korzysta z wbudowanego `fetch()` oraz `FormData`)
- Brak zewnętrznych zależności

## Instalacja

Preferowany sposób instalacji biblioteki poprzez [npm](https://www.npmjs.com/):

```bash
npm install aztec-decoder
```

Paczka dostępna na https://www.npmjs.com/package/aztec-decoder

## API

### `new AZTecDecoder(apiKey)`

Tworzy nową instancję dekodera.

| Parametr | Typ      | Opis                          |
|----------|----------|-------------------------------|
| `apiKey` | `string` | Klucz do usługi Web API       |

### `decoder.decodeImageFromFile(imagePath)`

Dekoduje kod AZTEC 2D bezpośrednio ze zdjęcia (PNG/JPG).

| Parametr    | Typ      | Opis                          |
|-------------|----------|-------------------------------|
| `imagePath` | `string` | Ścieżka do pliku graficznego  |

**Zwraca:** `Promise<Object|null>`

### `decoder.decodeText(text)`

Dekoduje kod AZTEC 2D z odczytanego ciągu znaków (np. ze skanera).

| Parametr | Typ      | Opis                                     |
|----------|----------|------------------------------------------|
| `text`   | `string` | Odczytana wartość kodu AZTEC 2D (ASCII)  |

**Zwraca:** `Promise<Object|null>`

### `decoder.decodeTextFromFile(filePath)`

Dekoduje kod AZTEC 2D z pliku tekstowego.

| Parametr   | Typ      | Opis                        |
|------------|----------|-----------------------------|
| `filePath` | `string` | Ścieżka do pliku tekstowego |

**Zwraca:** `Promise<Object|null>`

## Użycie

```javascript
//
// importuj moduł Dekoder AZTec dla Node.js
//
import { AZTecDecoder } from "aztec-decoder";

// inicjalizuj dekoder (używamy naszego klucza licencyjnego do inicjalizacji)
const decoder = new AZTecDecoder("ABCD-ABCD-ABCD-ABCD");

//
// 1. Dekoduj dane bezpośrednio z pliku graficznego, zwróć wynik jako rozkodowaną tablicę elementów JSON
//
const resultImage = await decoder.decodeImageFromFile("C:\\zdjecie-dowodu.jpg");

// czy udało się zdekodować dane?
if (resultImage?.Status === true) {
    // wyświetl rozkodowane dane (są zapisane jako rozkodowana tablica elementów JSON)
    console.log(JSON.stringify(resultImage, null, "\t"));
}

//
// 2. Dekoduj dane bezpośrednio z pliku graficznego i zwróć wynik jako rozkodowaną tablicę elementów JSON
//
const resultPng = await decoder.decodeImageFromFile("C:\\zdjecie-kodu-aztec-2d.png");

if (resultPng) {
    console.log(JSON.stringify(resultPng, null, "\t"));
}

//
// 3. Dekoduj dane z odczytanego już ciągu znaków (np. wykorzystując skaner ręczny)
//
// zakodowane dane z dowodu rejestracyjnego
const szValue = "ggMAANtYAAJD...";

const resultText = await decoder.decodeText(szValue);

if (resultText) {
    console.log(JSON.stringify(resultText, null, "\t"));
}

//
// 4. Dekoduj dane z odczytanego już ciągu znaków zapisanego w pliku (np. wykorzystując skaner ręczny)
//
const resultFile = await decoder.decodeTextFromFile("C:\\odczytany-ciag-znakow-aztec-2d.txt");

if (resultFile) {
    console.log(JSON.stringify(resultFile, null, "\t"));
}
```

## Migracja z wersji 1.x

Wersja 2.0 wprowadza następujące zmiany:

| Zmiana | v1.x | v2.0 |
|--------|------|------|
| Moduły | `require()` | `import` (ESM) |
| API | Globalne funkcje | Klasa `new AZTecDecoder(apiKey)` |
| Asynchroniczność | Callback | `async/await` (`Promise`) |
| Zależności | `node-fetch`, `form-data` | Brak (wbudowane w Node.js 18+) |

## Gdzie znajdzie zastosowanie Dekoder AZTec?

Dekoder AZTec może przydać się firmom i instytucjom, które pragną zautomatyzować proces ręcznego wprowadzania danych z dowodów rejestracyjnych i zastąpić go poprzez wykorzystanie naszej biblioteki programistycznej, która potrafi rozpoznać i rozkodowac kody AZTEC 2D bezpośrednio ze zdjęć dowodów rejestracyjnych lub zeskanowanych już kodów (wykorzystując skaner QR / AZTEC 2D).

![Kod AZTEC 2D zapisany w formie obrazkowej w dowodzie rejestracyjnym pojazdu](https://www.pelock.com/img/pl/produkty/dekoder-aztec/dowod-rejestracyjny-kod-aztec-2d.jpg)

## Dostępne edycje programistyczne

Dekoder AZTec dostepny jest w trzech edycjach. Każda wersja posiada inne cechy i inne możliwości dekodowania. Wersja oparta o Web API jako jedyna posiada możliwość rozpoznawania i dekodowania danych bezpośrednio ze zdjęć i obrazków. Pozostałe wersje do dekodowania wymagają już odczytanego kodu w postaci tekstu (np. ze skanera).

<details>
<summary><strong>Porównanie edycji</strong></summary>

<br />

<img align="right" alt="Dekodowanie kodu AZTEC 2D do formatu JSON" src="https://www.pelock.com/img/pl/produkty/dekoder-aztec/dekodowanie-kodu-aztec-2d-do-json.png">

| Cechy                                             | Web API | Źródła | Binaria |
|---------------------------------------------------|---------|--------|---------|
|  Dekodowanie danych ze zdjęć i obrazków (PNG/JPG) | ✅      | ❌    | ❌ |
|  Dekodowanie danych z zeskanowanych kodów (tekst) | ✅      | ✅    | ✅ |
|  Kody źródłowe algorytmu dekodującego             | ❌      | ✅    | ❌ |
|  Przykłady użycia                                 | ✅      | ✅    | ✅ |
|  Format wyjściowy JSON                            | ✅      | ✅    | ✅ |
|  Format wyjściowy XML                             | ❌      | ✅    | ✅ |
|  Wymagane połączenie z Internetem                 | ✅      | ❌    | ❌ |
|  Licencja wieczysta                               | ❌      | ✅    | ✅ |
|  Darmowe aktualizacje                             | ✅      | ✅    | ✅ |
|  Darmowe wsparcie techniczne                      | ✅      | ✅    | ✅ |

</details>

### Wersja Web API

Jest to najbardziej zaawansowana edycja Dekodera AZTec, ponieważ umożliwia precyzyjne rozpoznawanie i dekodowanie kodów AZTEC 2D bezpośrednio ze zdjęć oraz obrazków zapisanych w formatach PNG lub JPG.

Algorytm rozpoznawania obrazu należy do naszej firmy, jest to innowacyjne rozwiązanie rozwijane od podstaw przez prawie rok czasu.

Rozumiemy potrzeby naszych klientów oraz problemy wynikające z rozpoznawnia rzeczywistych zdjęć kodów AZTEC 2D znajdujących się w dowodach rejestracyjnych, które nie zawsze są idealnie wykonane, czy to ze względu na rodzaj aparatu, kąta wykonania zdjęcia, refleksów czy słabej rozdzielczości.

Przy tworzeniu naszego rozwiązania wzieliśmy wszystkie te czynniki pod uwagę i w efekcie nasz algorytm radzi sobie znakomicie z rozpoznawaniem kodów AZTEC 2D ze zdjęć z wszelkiego rodzaju zniekształceniami, uszkodzeniami i niedoskonałościami. Znacznie przewyższa pod względem funkcjonowania dostępne na rynku biblioteki rozpoznawnia kodów AZTEC 2D takie jak np. ZXing.

<details>
<summary><strong>Gotowe paczki dla różnych języków programowania</strong></summary>

<br />

Dla ułatwienia szybkiego wdrożenia, paczki instalacyjne Dekodera AZTec zostały wgrane na repozytoria dla kilku popularnych języków programowania, a dodatkowo ich kody źródłowe zostały opublikowane na GitHubie:

| Repozytorium | Język | Instalacja | Paczka | GitHub |
| ------------ | ----- | ---------- | ------ | ------ |
| ![Centralne Repozytorium Maven](https://www.pelock.com/img/logos/repo-maven.png) | Java | Dodaj wpis do pliku `pom.xml`<br />`<dependency>`<br />`  <groupId>com.pelock</groupId>`<br />`  <artifactId>AZTecDecoder</artifactId>`<br />`  <version>1.0.0</version>`<br />`</dependency>` | [Maven](https://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.pelock%22) | [Źródła](https://github.com/PELock/Dekoder-AZTEC-2D-Java)
| ![Repozytorium NPM](https://www.pelock.com//img/logos/repo-npm.png) | JavaScript, TypeScript | `npm install aztec-decoder` | [NPM](https://www.npmjs.com/package/aztec-decoder) | [Źródła](https://github.com/PELock/Dekoder-AZTEC-2D-JavaScript)
| ![Repozytorium NuGet](https://www.pelock.com/img/logos/repo-nuget.png) | C#, VB.NET, .NET | `PM> Install-Package AZTecDecoder` | [NuGet](https://www.nuget.org/packages/AZTecDecoder/) | [Źródła](https://github.com/PELock/Dekoder-AZTEC-2D-CSharp)
| ![Repozytorium Packagist dla Composer](https://www.pelock.com/img/logos/repo-packagist-composer.png) | PHP | Dodaj do sekcji `require` w twoim pliku `composer.json` linijkę `"pelock/aztec-decoder": "*"` | [Packagist](https://packagist.org/packages/pelock/aztec-decoder) | [Źródła](https://github.com/PELock/Dekoder-AZTEC-2D-PHP)
| ![Repozytorium PyPI dla Python](https://www.pelock.com/img/logos/repo-pypi.png) | Python | `pip install aztecdecoder` | [PyPi](https://pypi.org/project/aztecdecoder/) | [Źródła](https://github.com/PELock/Dekoder-AZTEC-2D-Python)

</details>

---

Bartosz Wójcik | [PELock](https://www.pelock.com) | [Twitter/X](https://x.com/PELock) | [Dekoder AZTec](https://www.dekoderaztec.pl)
