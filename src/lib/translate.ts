import dictionaryAR from "../../public/locales/ar.json";
import dictionaryEN from "../../public/locales/en.json";

// Ensure the dictionaries are typed correctly
const dictionaryARTyped: Record<string, string> = dictionaryAR;
const dictionaryENTyped: Record<string, string> = dictionaryEN;

export function translateString(text: string, language: string): string {
  const lowerCasedText = text.toLowerCase(); // Make the input text lowercase

  if (language === "ar") {
    // Find the Arabic translation from the English dictionary (case-insensitive)
    const arTranslation = Object.keys(dictionaryARTyped).find(
      (key) => key.toLowerCase() === lowerCasedText,
    );
    return arTranslation
      ? dictionaryARTyped[arTranslation]
      : "Translation not found";
  } else if (language === "en") {
    // Reverse the Arabic dictionary to find English translations (case-insensitive)
    const reversedDictionary = Object.fromEntries(
      Object.entries(dictionaryENTyped).map(([key, value]) => [
        value.toLowerCase(),
        key,
      ]),
    );
    return reversedDictionary[lowerCasedText] || text;
  } else {
    return text;
  }
}
