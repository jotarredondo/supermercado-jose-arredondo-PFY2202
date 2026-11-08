import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter.jsx';
import InventoryTable from '../components/InventoryTable.jsx';
import { useInventory } from '../context/InventoryContext.jsx';
import { filterProductsByCategory, getCategories } from '../utils/inventoryFilter.js';

export default function InventoryPage() {
  const { products } = useInventory();
  const [category, setCategory] = useState('');
  const categories = getCategories(products);
  const visibleProducts = filterProductsByCategory(products, category);

  return (
    <>
      <p className="text-[0.85rem] font-[750] tracking-[0.06em] text-[#37603d] uppercase">Gestión de inventario</p>
      <h1>Inventario</h1>
      <p className="max-w-[65ch]">Consulta los artículos registrados en La Canasta durante esta sesión.</p>
      <CategoryFilter categories={categories} value={category} onChange={setCategory} />
      <p role="status">Mostrando {visibleProducts.length} de {products.length} productos.</p>
      <InventoryTable products={visibleProducts} />
      <p className="mt-6 text-[0.9rem] text-[#506052]">Los productos se conservan mientras navegas por el sitio y se borran al recargar o cerrar la aplicación.</p>
    </>
  );
}
