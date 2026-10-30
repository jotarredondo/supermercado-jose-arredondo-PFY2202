export default function AboutPage() {
  return (
    <>
      <p className="text-[0.85rem] font-[750] tracking-[0.06em] text-[#37603d] uppercase">Nuestra historia</p>
      <h1>Quiénes somos</h1>
      <p className="max-w-[65ch]">La Canasta nació como un pequeño negocio familiar con una idea sencilla: acercar productos de calidad a las familias del barrio.</p>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
        <section className="rounded-xl border border-[#d9e1d6] bg-white p-6 [&>h2]:mt-0 [&>h3]:mt-0">
          <h2>Nuestra misión</h2>
          <p>Facilitar las compras cotidianas con una oferta variada, atención amable y productos seleccionados con cuidado.</p>
        </section>
        <section className="rounded-xl border border-[#d9e1d6] bg-white p-6 [&>h2]:mt-0 [&>h3]:mt-0">
          <h2>Nuestra visión</h2>
          <p>Ser el supermercado de confianza de nuestra comunidad y crecer junto a sus necesidades.</p>
        </section>
        <section className="rounded-xl border border-[#d9e1d6] bg-white p-6 [&>h2]:mt-0 [&>h3]:mt-0">
          <h2>Nuestros valores</h2>
          <ul className="list-disc pl-5">
            <li>Cercanía con nuestros vecinos.</li>
            <li>Honestidad en cada atención.</li>
            <li>Compromiso con la calidad.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
