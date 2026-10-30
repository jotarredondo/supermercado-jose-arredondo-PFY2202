import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section className="mb-8 rounded-2xl border border-[#cbdcc6] bg-[#e5eee1] p-[clamp(1.5rem,5vw,3rem)] [&>p]:max-w-[65ch]">
      <p className="text-[0.85rem] font-[750] tracking-[0.06em] text-[#37603d] uppercase">Error 404</p>
      <h1>Página no encontrada</h1>
      <p>La dirección que visitaste no corresponde a una página de La Canasta.</p>
      <Link className="inline-block rounded-lg border-0 bg-[#17633f] px-[1.1rem] py-[0.7rem] font-[650] text-white no-underline hover:bg-[#10482d] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#b45e00]" to="/">Volver al inicio</Link>
    </section>
  );
}
