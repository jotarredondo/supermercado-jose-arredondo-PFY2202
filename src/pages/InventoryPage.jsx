import InventoryTable from '../components/InventoryTable.jsx';

export default function InventoryPage() {
  return (
    <>
      <p className="text-[0.85rem] font-[750] tracking-[0.06em] text-[#37603d] uppercase">Gestión de inventario</p>
      <h1>Inventario</h1>
      <p className="max-w-[65ch]">Consulta los artículos registrados en La Canasta durante esta sesión.</p>
      <InventoryTable />
      <p className="mt-6 text-[0.9rem] text-[#506052]">Los productos se conservan mientras navegas por el sitio y se borran al recargar o cerrar la aplicación.</p>
    </>
  );
}
