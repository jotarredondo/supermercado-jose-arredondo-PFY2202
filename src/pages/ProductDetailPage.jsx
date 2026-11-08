import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useInventory } from '../context/InventoryContext.jsx';
import {
  selectProductById, selectCartQuantity, selectAvailableStock,
} from '../context/inventorySelectors.js';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const inventory = useInventory();
  const product = selectProductById(inventory, productId);
  const quantity = selectCartQuantity(inventory, productId);
  const available = selectAvailableStock(inventory, productId);
  const [lastAttempt, setLastAttempt] = useState(null);

  function handleAddToCart() {
    setLastAttempt({ productId, previousQuantity: quantity });
    inventory.dispatch({ type: 'INCREMENT_CART_ITEM', payload: { productId } });
  }

  if (!product) {
    return (
      <>
        <h1>Producto no encontrado</h1>
        <p>El producto solicitado no está en el inventario de esta sesión. Los datos se reinician al recargar la aplicación.</p>
        <Link to="/inventario">Volver al inventario</Link>
      </>
    );
  }

  const added = lastAttempt?.productId === productId && quantity > lastAttempt.previousQuantity;

  return (
    <>
      <p className="text-[0.85rem] font-[750] tracking-[0.06em] text-[#37603d] uppercase">Detalle del producto</p>
      <h1>{product.name}</h1>
      <section className="mb-6 max-w-[640px] rounded-xl border border-[#d9e1d6] bg-white p-6" aria-label="Información del producto">
        <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-2 min-[481px]:grid-cols-2 [&_dt]:font-[650] [&_dd]:m-0">
          <dt>Nombre</dt><dd>{product.name}</dd>
          <dt>Marca</dt><dd>{product.brand}</dd>
          <dt>Categoría</dt><dd>{product.type}</dd>
          <dt>Stock total registrado</dt><dd>{product.stock}</dd>
          <dt>Cantidad reservada en el carrito</dt><dd>{quantity}</dd>
          <dt>Cantidad disponible</dt><dd>{available}</dd>
        </dl>
        <button
          type="button"
          className="mt-6 inline-block cursor-pointer rounded-lg border-0 bg-[#17633f] px-[1.1rem] py-[0.7rem] font-[650] text-white hover:bg-[#10482d] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#b45e00] disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleAddToCart}
          disabled={available <= 0}
        >
          Agregar al carrito
        </button>
        {available <= 0 && <p className="mt-4 mb-0">No hay unidades disponibles para agregar al carrito.</p>}
        <p className="mt-4 mb-0 font-[650] text-[#17633f] empty:m-0" role="status" aria-atomic="true">
          {added ? `Se agregó una unidad de «${product.name}» al carrito. Cantidad reservada: ${quantity}.` : ''}
        </p>
      </section>
      <Link to="/inventario">Volver al inventario</Link>
    </>
  );
}
