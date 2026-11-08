import { selectAvailableStock, selectProductById } from './inventorySelectors.js';
import { getCategoryDisplayName } from '../utils/inventoryFilter.js';

export const initialInventoryState = { products: [], cart: [] };

function isValidProduct(product) {
  return product != null
    && ['id', 'name', 'brand', 'type'].every(
      (field) => typeof product[field] === 'string' && product[field].trim().length > 0,
    )
    && Number.isSafeInteger(product.stock)
    && product.stock >= 0;
}

export default function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const product = action.payload;
      if (!isValidProduct(product) || selectProductById(state, product.id)) return state;
      const { id, name, brand, type, stock } = product;
      const category = getCategoryDisplayName(type, state.products);
      return { ...state, products: [...state.products, { id, name, brand, type: category, stock }] };
    }
    case 'INCREMENT_CART_ITEM': {
      const productId = action.payload?.productId;
      if (!selectProductById(state, productId) || selectAvailableStock(state, productId) <= 0) {
        return state;
      }
      const exists = state.cart.some((item) => item.productId === productId);
      const cart = exists
        ? state.cart.map((item) => item.productId === productId
          ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.cart, { productId, quantity: 1 }];
      return { ...state, cart };
    }
    case 'DECREMENT_CART_ITEM': {
      const productId = action.payload?.productId;
      const item = state.cart.find((entry) => entry.productId === productId);
      if (!item || item.quantity <= 0) return state;
      const cart = item.quantity === 1
        ? state.cart.filter((entry) => entry.productId !== productId)
        : state.cart.map((entry) => entry.productId === productId
          ? { ...entry, quantity: entry.quantity - 1 } : entry);
      return { ...state, cart };
    }
    default:
      return state;
  }
}
