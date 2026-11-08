import { Link } from 'react-router';

export default function CartItem({ product, quantity, available, onIncrement, onDecrement }) {
  const buttonClass = 'min-h-12 cursor-pointer rounded-lg border-0 bg-[#17633f] px-4 py-3 font-[650] text-white hover:bg-[#10482d] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#b45e00] disabled:cursor-not-allowed disabled:opacity-60';

  return (
    <li className="rounded-xl border border-[#d9e1d6] bg-white p-6">
      <h2 className="mt-0"><Link to={`/productos/${encodeURIComponent(product.id)}`}>{product.name}</Link></h2>
      <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-2 min-[481px]:grid-cols-2 [&_dt]:font-[650] [&_dd]:m-0">
        <dt>Marca</dt><dd>{product.brand}</dd>
        <dt>Categoría</dt><dd>{product.type}</dd>
        <dt>Cantidad seleccionada</dt><dd>{quantity}</dd>
        <dt>Stock disponible</dt><dd>{available}</dd>
      </dl>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" className={buttonClass} onClick={() => onDecrement(product.id)} aria-label={`Disminuir una unidad de ${product.name}`}>
          Disminuir
        </button>
        <button type="button" className={buttonClass} onClick={() => onIncrement(product.id)} disabled={available <= 0} aria-label={`Aumentar una unidad de ${product.name}`}>
          Aumentar
        </button>
      </div>
      {available <= 0 && <p className="mt-4 mb-0">No hay más unidades disponibles.</p>}
      <p className="mt-4 mb-0 text-[0.9rem] text-[#506052]">Al disminuir la última unidad, el producto se retira del carrito.</p>
    </li>
  );
}
