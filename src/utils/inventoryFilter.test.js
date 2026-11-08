import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProductsByCategory, getCategories, getCategoryDisplayName, normalizeCategory } from './inventoryFilter.js';
import reducer, { initialInventoryState } from '../context/inventoryReducer.js';
import { selectAvailableStock } from '../context/inventorySelectors.js';

const products = Object.freeze([
  Object.freeze({ id: 'a', name: 'Leche', brand: 'Campo', type: ' Lácteos ', stock: 3 }),
  Object.freeze({ id: 'b', name: 'Yogur', brand: 'Campo', type: 'LÁCTEOS', stock: 0 }),
  Object.freeze({ id: 'c', name: 'Arroz', brand: 'Sol', type: ' Abarrotes   básicos ', stock: 5 }),
  Object.freeze({ id: 'd', name: 'Fideos', brand: 'Sol', type: 'abarrotes básicos', stock: 2 }),
]);

test('inventario vacío no genera categorías ni resultados', () => {
  assert.deepEqual(getCategories([]), []);
  assert.deepEqual(filterProductsByCategory([], ''), []);
});

test('categorías dinámicas sin duplicados por mayúsculas o espacios', () => {
  assert.deepEqual(getCategories(products), [
    { value: 'lacteos', label: 'Lácteos' },
    { value: 'abarrotes basicos', label: 'Abarrotes básicos' },
  ]);
});

test('cada categoría filtra sin alterar los productos y Todas recupera la lista completa', () => {
  const snapshot = structuredClone(products);
  for (const category of getCategories(products)) {
    const visible = filterProductsByCategory(products, category.value);
    assert.equal(visible.length, 2);
    assert.ok(visible.every((product) => products.includes(product)));
    assert.strictEqual(filterProductsByCategory(products, ''), products);
  }
  assert.deepEqual(products, snapshot);
  assert.deepEqual(filterProductsByCategory(products, 'inexistente'), []);
});

test('registrar nuevos productos actualiza categorías sin duplicarlas', () => {
  let state = { ...initialInventoryState, products };
  state = reducer(state, { type: 'ADD_PRODUCT', payload: {
    id: 'e', name: 'Manzana', brand: 'Huerto', type: 'Frutas', stock: 4,
  } });
  assert.equal(getCategories(state.products).length, 3);
  assert.equal(filterProductsByCategory(state.products, 'frutas').length, 1);
  state = reducer(state, { type: 'ADD_PRODUCT', payload: {
    id: 'f', name: 'Pera', brand: 'Huerto', type: ' FRUTAS ', stock: 1,
  } });
  assert.equal(getCategories(state.products).length, 3);
  assert.equal(filterProductsByCategory(state.products, 'frutas').length, 2);
  assert.equal(products.length, 4);
});

test('filtrar conserva agotados y la disponibilidad calculada con el carrito', () => {
  const state = reducer({ products, cart: [] }, {
    type: 'INCREMENT_CART_ITEM', payload: { productId: 'a' },
  });
  const visible = filterProductsByCategory(state.products, 'lácteos');
  assert.deepEqual(visible.map((product) => selectAvailableStock(state, product.id)), [2, 0]);
  assert.equal(state.products.length, 4);
  assert.equal(state.products[0].stock, 3);
  assert.deepEqual(state.cart, [{ productId: 'a', quantity: 1 }]);
});

test('registro unifica variantes con y sin acentos y preserva otros atributos', () => {
  let state = initialInventoryState;
  const variants = ['Lacteos', 'LACTEOS', 'lacteos', 'Lácteos', '  LACTeos  ', 'La\u0301cteos'];
  for (const [index, type] of variants.entries()) {
    const original = Object.freeze({ id: `milk-${index}`, name: `Leche ${index}`, brand: 'Mi MARCA', type, stock: index });
    const before = structuredClone(original);
    state = reducer(state, { type: 'ADD_PRODUCT', payload: original });
    assert.deepEqual(state.products[index], { ...original, type: 'Lacteos' });
    assert.deepEqual(original, before);
    assert.equal(normalizeCategory(type), 'lacteos');
  }
  assert.deepEqual(getCategories(state.products), [{ value: 'lacteos', label: 'Lacteos' }]);
  assert.equal(filterProductsByCategory(state.products, ' LÁCTEOS ').length, variants.length);
  assert.equal(state.products.length, variants.length);
});

test('limpia espacios y reutiliza el nombre existente sin cambiar productos anteriores', () => {
  const existing = Object.freeze({ id: 'old', name: 'Arroz INTEGRAL', brand: 'Marca Original', type: 'Abarrotes básicos', stock: 7 });
  const base = Object.freeze({ products: Object.freeze([existing]), cart: Object.freeze([]) });
  const input = Object.freeze({ id: 'new', name: 'Fideos Especiales', brand: 'Otra MARCA', type: '  ABARROTES   BASICOS  ', stock: 2 });
  const state = reducer(base, { type: 'ADD_PRODUCT', payload: input });
  assert.deepEqual(state.products[1], { ...input, type: 'Abarrotes básicos' });
  assert.strictEqual(state.products[0], existing);
  assert.equal(getCategoryDisplayName('  FRUTAS   FRESCAS  '), 'Frutas frescas');
  assert.equal(normalizeCategory(' \t ABARROTES   BÁSICOS \n'), 'abarrotes basicos');
  assert.equal(filterProductsByCategory(state.products, 'abarrotes básicos').length, 2);
  assert.deepEqual(getCategories(state.products), [{ value: 'abarrotes basicos', label: 'Abarrotes básicos' }]);
});
