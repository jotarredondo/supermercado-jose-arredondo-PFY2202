export function selectProductById(state, productId) {
  return state.products.find((product) => product.id === productId);
}

export function selectCartQuantity(state, productId) {
  return state.cart.find((item) => item.productId === productId)?.quantity ?? 0;
}

export function selectAvailableStock(state, productId) {
  const product = selectProductById(state, productId);
  return product ? product.stock - selectCartQuantity(state, productId) : 0;
}

// Los datos del producto se combinan solo para la vista, sin duplicarlos en el estado.
export function selectCartItems(state) {
  return state.cart.map((item) => ({
    product: selectProductById(state, item.productId),
    quantity: item.quantity,
    available: selectAvailableStock(state, item.productId),
  }));
}
