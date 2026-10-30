import { Link } from 'react-router';

export default function HomePage() {
  return (
    <>
      <section className="mb-8 rounded-2xl border border-[#cbdcc6] bg-[#e5eee1] p-[clamp(1.5rem,5vw,3rem)] [&>p]:max-w-[65ch]">
        <p className="text-[0.85rem] font-[750] tracking-[0.06em] text-[#37603d] uppercase">Bienvenidos a La Canasta</p>
        <h1>Lo que necesitas, cerca de ti.</h1>
        <p>Encuentra alimentos frescos, productos de despensa y artículos para el hogar en un supermercado pensado para nuestro barrio.</p>
        <Link className="inline-block rounded-lg border-0 bg-[#17633f] px-[1.1rem] py-[0.7rem] font-[650] text-white no-underline hover:bg-[#10482d] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#b45e00]" to="/quienes-somos">Conoce nuestra historia</Link>
      </section>
      <section aria-labelledby="propuesta">
        <h2 id="propuesta">Una buena compra comienza con confianza</h2>
        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
          <article className="rounded-xl border border-[#d9e1d6] bg-white p-6 [&>h2]:mt-0 [&>h3]:mt-0">
            <h3>Productos frescos</h3>
            <p>Seleccionamos frutas, verduras y alimentos para acompañar tus comidas de cada día.</p>
          </article>
          <article className="rounded-xl border border-[#d9e1d6] bg-white p-6 [&>h2]:mt-0 [&>h3]:mt-0">
            <h3>Variedad para tu hogar</h3>
            <p>Reunimos productos de despensa, limpieza y cuidado personal en un mismo lugar.</p>
          </article>
          <article className="rounded-xl border border-[#d9e1d6] bg-white p-6 [&>h2]:mt-0 [&>h3]:mt-0">
            <h3>Atención cercana</h3>
            <p>Nuestro equipo está disponible para orientarte y escuchar tus sugerencias.</p>
            <Link to="/contacto">Consulta nuestros canales de contacto</Link>
          </article>
        </div>
      </section>
    </>
  );
}
