export function parseStock(text) {
  if (!/^[0-9]+$/.test(text)) return null;
  const stock = Number(text);
  return Number.isSafeInteger(stock) ? stock : null;
}
