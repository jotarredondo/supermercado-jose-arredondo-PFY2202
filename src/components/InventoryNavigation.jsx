import { NavLink } from 'react-router';

export default function InventoryNavigation() {
  const baseClasses = 'flex h-full min-h-12 items-center justify-center rounded-lg p-2 text-center text-[0.85rem] font-[650] no-underline hover:bg-[#f0f5ed] min-[481px]:text-base';
  const linkClass = ({ isActive }) =>
    isActive ? `${baseClasses} bg-[#e5eee1] text-[#10482d] shadow-[inset_0_-3px_#17633f]` : baseClasses;

  return (
    <nav className="border-b border-[#cbdcc6] bg-[#edf3e9]" aria-label="Gestión de inventario">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1080px] flex flex-wrap items-center gap-x-6 gap-y-2 py-2">
        <span className="font-[750]">Inventario</span>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          <li><NavLink to="/productos/nuevo" className={linkClass}>Agregar producto</NavLink></li>
          <li><NavLink to="/inventario" className={linkClass}>Ver inventario</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
