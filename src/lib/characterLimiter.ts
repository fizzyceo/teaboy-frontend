export function characterLimiter(text: string, length: number): string {
  if (text.length <= length) {
    return text; // Return the original text if it's within the limit
  }
  return text.slice(0, length) + "..."; // Truncate and append three dots
}
