import ProductForm from '../components/ProductForm.jsx';

export default function AddProductPage() {
  return (
    <>
      <p className="text-[0.85rem] font-[750] tracking-[0.06em] text-[#37603d] uppercase">Gestión de inventario</p>
      <h1>Agregar producto</h1>
      <p className="max-w-[65ch]">Registra el nombre, la marca y el tipo de cada artículo para incorporarlo al inventario de La Canasta.</p>
      <ProductForm />
    </>
  );
}
