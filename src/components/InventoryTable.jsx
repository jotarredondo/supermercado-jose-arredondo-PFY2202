import { Link } from 'react-router';
import { useInventory } from '../context/InventoryContext.jsx';
import { selectAvailableStock } from '../context/inventorySelectors.js';

export default function InventoryTable({ products }) {
  const inventory = useInventory();

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-[#d9e1d6] bg-white p-6 [&>h2]:mt-0 [&>h3]:mt-0">
        {inventory.products.length === 0 ? (
          <>
            <p>Aún no hay artículos en el inventario.</p>
            <Link to="/productos/nuevo">Agregar el primer producto</Link>
          </>
        ) : (
          <p>No hay productos para la categoría seleccionada. Selecciona «Todas» para ver el inventario completo.</p>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[#d9e1d6] bg-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#b45e00]" role="region" aria-label="Inventario de productos" tabIndex={0}>
      <table className="w-full border-collapse text-left [&_th]:bg-[#e5eee1] [&_th]:font-bold [&_th]:min-w-[140px] [&_td]:min-w-[140px] [&_th]:border-b [&_td]:border-b [&_th]:border-[#d9e1d6] [&_td]:border-[#d9e1d6] [&_th]:px-4 [&_td]:px-4 [&_th]:py-[0.85rem] [&_td]:py-[0.85rem] [&_th]:[overflow-wrap:anywhere] [&_td]:[overflow-wrap:anywhere] [&_tbody_tr:last-child_td]:border-b-0">
        <caption className="p-4 text-left font-[650]">Productos visibles: {products.length}</caption>
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Marca</th>
            <th scope="col">Tipo de producto</th>
            <th scope="col">Disponibilidad</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><Link to={`/productos/${encodeURIComponent(product.id)}`}>{product.name}</Link></td>
              <td>{product.brand}</td>
              <td>{product.type}</td>
              <td>{selectAvailableStock(inventory, product.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
