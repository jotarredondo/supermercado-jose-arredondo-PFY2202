import { Link } from 'react-router';
import CartItem from '../components/CartItem.jsx';
import { useInventory } from '../context/InventoryContext.jsx';
import { selectCartItems } from '../context/inventorySelectors.js';

export default function CartPage() {
  const inventory = useInventory();
  const items = selectCartItems(inventory);
  const totalUnits = items.reduce((total, item) => total + item.quantity, 0);

  function increment(productId) {
    inventory.dispatch({ type: 'INCREMENT_CART_ITEM', payload: { productId } });
  }

  function decrement(productId) {
    inventory.dispatch({ type: 'DECREMENT_CART_ITEM', payload: { productId } });
  }

  return (
    <>
      <p className="text-[0.85rem] font-[750] tracking-[0.06em] text-[#37603d] uppercase">Compras en La Canasta</p>
      <h1>Carrito</h1>
      <p role="status" aria-atomic="true">Productos diferentes: {items.length}. Unidades en el carrito: {totalUnits}.</p>
      {items.length === 0 ? (
        <div className="mb-6 rounded-xl border border-[#d9e1d6] bg-white p-6">
          <p>Tu carrito está vacío. Agrega productos desde su página de detalle.</p>
        </div>
      ) : (
        <ul className="mb-6 grid list-none gap-5 p-0">
          {items.map((item) => (
            <CartItem key={item.product.id} {...item} onIncrement={increment} onDecrement={decrement} />
          ))}
        </ul>
      )}
      <Link to="/inventario">Volver al inventario</Link>
    </>
  );
}
