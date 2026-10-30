import { Link, Outlet } from 'react-router';
import BottomNavigation from '../components/BottomNavigation.jsx';
import InventoryNavigation from '../components/InventoryNavigation.jsx';

export default function MainLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a className="fixed -top-32 left-4 z-10 bg-white p-3 focus:top-4" href="#contenido">Saltar al contenido</a>
      <header className="bg-[#174b34] py-5 text-white">
        <div className="mx-auto w-[calc(100%-2rem)] max-w-[1080px] flex flex-wrap items-center justify-between gap-x-8 gap-y-2 [&>span]:text-[0.9rem] min-[481px]:[&>span]:text-base">
          <Link className="text-[1.3rem] font-[750] text-white no-underline" to="/">Supermercado La Canasta</Link>
          <span>Frescura y cercanía para tu día a día</span>
        </div>
      </header>
      <InventoryNavigation />
      <main id="contenido" className="mx-auto w-[calc(100%-2rem)] max-w-[1080px] flex-1 py-6 min-[481px]:py-10 [overflow-wrap:anywhere]" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="p-4 text-center text-[0.85rem] text-[#506052] [&>p]:m-0">
        <p>La Canasta · Supermercado ficticio · Proyecto académico PFY2202</p>
      </footer>
      <BottomNavigation />
    </div>
  );
}
