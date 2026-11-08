function cleanCategory(value) {
  return value.trim().replace(/\s+/g, ' ');
}

export function normalizeCategory(value) {
  return cleanCategory(value).toLocaleLowerCase('es').normalize('NFD').replace(/\p{M}/gu, '');
}

export function getCategoryDisplayName(value, products = []) {
  const key = normalizeCategory(value);
  const existing = products.find((product) => normalizeCategory(product.type) === key);
  if (existing) return cleanCategory(existing.type);
  const label = cleanCategory(value).toLocaleLowerCase('es');
  return label.charAt(0).toLocaleUpperCase('es') + label.slice(1);
}

export function getCategories(products) {
  const categories = new Map();
  for (const product of products) {
    const value = normalizeCategory(product.type);
    if (!categories.has(value)) {
      categories.set(value, { value, label: getCategoryDisplayName(product.type, products) });
    }
  }
  return [...categories.values()];
}

export function filterProductsByCategory(products, category) {
  return category === ''
    ? products
    : products.filter((product) => normalizeCategory(product.type) === normalizeCategory(category));
}
