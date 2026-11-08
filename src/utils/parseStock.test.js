import test from 'node:test';
import assert from 'node:assert/strict';
import { parseStock } from './parseStock.js';

test('acepta cero, enteros positivos y el máximo entero seguro', () => {
  for (const [text, expected] of [
    ['0', 0], ['00', 0], ['0010', 10], ['1', 1],
    ['9007199254740990', Number.MAX_SAFE_INTEGER - 1],
    ['9007199254740991', Number.MAX_SAFE_INTEGER],
  ]) {
    assert.equal(parseStock(text), expected, text);
  }
});

test('rechaza entradas vacías, negativas, decimales y otras notaciones', () => {
  for (const text of [
    '', ' ', '\t', '\n', '-1', '-0', '0.5', '1.0', '.5', '1.',
    'abc', 'NaN', 'Infinity', '1e3', '0x10', '+1', '1,5', '1 0',
    ' 1', '1 ', '1\n',
  ]) {
    assert.equal(parseStock(text), null, JSON.stringify(text));
  }
});

test('rechaza decimales que Number redondearía a un entero válido', () => {
  for (const text of ['0.99999999999999999', '1.00000000000000001', '9007199254740991.1']) {
    assert.ok(Number.isSafeInteger(Number(text)), text);
    assert.equal(parseStock(text), null, text);
  }
});

test('rechaza enteros superiores a Number.MAX_SAFE_INTEGER', () => {
  for (const text of ['9007199254740992', '9007199254740993', '9'.repeat(400)]) {
    assert.equal(parseStock(text), null, text);
  }
});
