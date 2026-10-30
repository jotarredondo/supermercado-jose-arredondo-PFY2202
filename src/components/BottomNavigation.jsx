import { NavLink } from 'react-router';

export default function BottomNavigation() {
  const baseClasses = 'flex h-full min-h-12 items-center justify-center rounded-lg p-2 text-center text-[0.85rem] font-[650] no-underline hover:bg-[#f0f5ed] min-[481px]:text-base';
  const linkClass = ({ isActive }) =>
    isActive ? `${baseClasses} bg-[#e5eee1] text-[#10482d] shadow-[inset_0_-3px_#17633f]` : baseClasses;

  return (
    <nav className="sticky bottom-0 border-t border-[#d9e1d6] bg-white pt-[0.65rem] pb-[max(0.65rem,env(safe-area-inset-bottom))]" aria-label="Información del supermercado">
      <ul className="mx-auto w-[calc(100%-2rem)] max-w-[1080px] grid list-none grid-cols-3 gap-1 p-0 min-[481px]:gap-2">
        <li><NavLink to="/" end className={linkClass}>Inicio</NavLink></li>
        <li><NavLink to="/quienes-somos" className={linkClass}>Quiénes somos</NavLink></li>
        <li><NavLink to="/contacto" className={linkClass}>Contáctanos</NavLink></li>
      </ul>
    </nav>
  );
}
