import test from 'node:test';
import assert from 'node:assert/strict';
import reducer, { initialInventoryState } from './inventoryReducer.js';
import {
  selectProductById, selectCartQuantity, selectAvailableStock, selectCartItems,
} from './inventorySelectors.js';

const product = { id: 'milk', name: 'Leche', brand: 'Campo', type: 'Lácteos', stock: 2 };
const add = (payload) => ({ type: 'ADD_PRODUCT', payload });
const increment = (productId = product.id) => ({ type: 'INCREMENT_CART_ITEM', payload: { productId } });
const decrement = (productId = product.id) => ({ type: 'DECREMENT_CART_ITEM', payload: { productId } });
const registered = () => reducer(initialInventoryState, add(product));

function freezeDeep(value) {
  Object.freeze(value);
  Object.values(value).forEach((child) => {
    if (child && typeof child === 'object') freezeDeep(child);
  });
  return value;
}

test('registra productos con stock positivo y cero, sin modificar el estado inicial', () => {
  const state = registered();
  assert.deepEqual(state, { products: [product], cart: [] });
  assert.deepEqual(initialInventoryState, { products: [], cart: [] });
  assert.notStrictEqual(state.products[0], product);
  assert.equal(reducer(state, add({ ...product, id: 'zero', stock: 0 })).products[1].stock, 0);
});

test('rechaza stock inválido y conserva exactamente el estado anterior', () => {
  for (const stock of [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, '', '2', 'abc', null, undefined]) {
    assert.strictEqual(reducer(initialInventoryState, add({ ...product, stock })), initialInventoryState);
  }
});

test('rechaza campos requeridos inválidos, payload ausente e identificadores duplicados', () => {
  for (const field of ['id', 'name', 'brand', 'type']) {
    for (const value of ['', '   ', null, undefined, 42]) {
      assert.strictEqual(reducer(initialInventoryState, add({ ...product, [field]: value })), initialInventoryState);
    }
  }
  assert.strictEqual(reducer(initialInventoryState, add(undefined)), initialInventoryState);
  const state = registered();
  assert.strictEqual(reducer(state, add({ ...product, name: 'Otra leche' })), state);
});

test('incrementa una línea sin duplicar productos ni superar el stock', () => {
  let state = registered();
  state = reducer(state, increment());
  assert.deepEqual(state.cart, [{ productId: product.id, quantity: 1 }]);
  assert.equal(selectAvailableStock(state, product.id), 1);
  state = reducer(state, increment());
  assert.deepEqual(state.cart, [{ productId: product.id, quantity: 2 }]);
  assert.equal(selectAvailableStock(state, product.id), 0);
  assert.strictEqual(reducer(state, increment()), state);
  const zero = reducer(initialInventoryState, add({ ...product, stock: 0 }));
  assert.strictEqual(reducer(zero, increment()), zero);
});

test('disminuye cantidades, devuelve disponibilidad y elimina la línea al llegar a cero', () => {
  const full = reducer(reducer(registered(), increment()), increment());
  const one = reducer(full, decrement());
  assert.equal(selectCartQuantity(one, product.id), 1);
  assert.equal(selectAvailableStock(one, product.id), 1);
  const empty = reducer(one, decrement());
  assert.deepEqual(empty.cart, []);
  assert.equal(selectAvailableStock(empty, product.id), 2);
  assert.strictEqual(reducer(empty, decrement()), empty);
});

test('rechaza productos inexistentes y payloads inválidos', () => {
  const state = registered();
  for (const action of [increment('missing'), decrement('missing'),
    { type: 'INCREMENT_CART_ITEM' }, { type: 'DECREMENT_CART_ITEM', payload: null }]) {
    assert.strictEqual(reducer(state, action), state);
  }
  assert.strictEqual(reducer(state, { type: 'UNKNOWN' }), state);
});

test('acciones y selectores respetan estados congelados y conservan líneas ajenas', () => {
  const base = freezeDeep(reducer(registered(), add({ ...product, id: 'bread' })));
  const first = freezeDeep(reducer(base, increment('bread')));
  const snapshot = structuredClone(first);
  const second = freezeDeep(reducer(first, increment()));
  const third = freezeDeep(reducer(second, increment()));
  const fourth = freezeDeep(reducer(third, decrement()));
  const last = reducer(fourth, decrement());
  assert.deepEqual(first, snapshot);
  assert.strictEqual(second.products, first.products);
  assert.strictEqual(second.cart[0], first.cart[0]);
  assert.deepEqual(last.cart, [{ productId: 'bread', quantity: 1 }]);
  assert.deepEqual(selectCartItems(fourth), [
    { product: base.products[1], quantity: 1, available: 1 },
    { product: base.products[0], quantity: 1, available: 1 },
  ]);
  assert.strictEqual(selectProductById(base, product.id), base.products[0]);
  assert.equal(selectProductById(base, 'missing'), undefined);
  assert.equal(selectCartQuantity(base, 'missing'), 0);
  assert.equal(selectAvailableStock(base, 'missing'), 0);
  assert.deepEqual(selectCartItems(base), []);
});

test('carrito con varios productos conserva disponibilidad durante incrementos y devoluciones', () => {
  let state = reducer(registered(), add({ ...product, id: 'bread', name: 'Pan', stock: 3 }));
  const originalProducts = state.products;
  assert.deepEqual(selectCartItems(state), []);
  for (const action of [increment(), increment('bread'), increment('bread'), increment()]) {
    state = reducer(freezeDeep(state), action);
    for (const item of selectCartItems(state)) {
      assert.equal(item.available + item.quantity, item.product.stock);
      assert.equal(selectCartQuantity(state, item.product.id), item.quantity);
      assert.equal(selectAvailableStock(state, item.product.id), item.available);
      assert.ok(item.available >= 0);
    }
  }
  assert.equal(selectCartItems(state).length, 2);
  assert.strictEqual(reducer(state, increment()), state);
  state = reducer(state, decrement());
  assert.equal(selectAvailableStock(state, product.id), 1);
  state = reducer(state, decrement());
  assert.equal(selectCartItems(state).length, 1);
  assert.equal(selectAvailableStock(state, product.id), 2);
  state = reducer(reducer(state, decrement('bread')), decrement('bread'));
  assert.deepEqual(selectCartItems(state), []);
  assert.equal(selectAvailableStock(state, 'bread'), 3);
  assert.strictEqual(state.products, originalProducts);
});
