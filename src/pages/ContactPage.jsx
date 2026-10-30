export default function ContactPage() {
  return (
    <>
      <p className="text-[0.85rem] font-[750] tracking-[0.06em] text-[#37603d] uppercase">Estamos para ayudarte</p>
      <h1>Contáctanos</h1>
      <p className="max-w-[65ch]">¿Tienes una consulta sobre nuestros productos o una sugerencia? Estos son nuestros canales de atención.</p>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
        <section className="rounded-xl border border-[#d9e1d6] bg-white p-6 [&>h2]:mt-0 [&>h3]:mt-0">
          <h2>Canales de contacto</h2>
          <dl className="m-0 [&>dt]:font-bold [&>dd]:mb-4 [&>dd]:ml-0">
            <dt>Correo electrónico</dt>
            <dd><a href="mailto:contacto@lacanasta.example">contacto@lacanasta.example</a></dd>
            <dt>Dirección</dt>
            <dd>Avenida del Barrio 123, Santiago, Chile.</dd>
          </dl>
        </section>
        <section className="rounded-xl border border-[#d9e1d6] bg-white p-6 [&>h2]:mt-0 [&>h3]:mt-0">
          <h2>Horario de atención</h2>
          <p>Lunes a viernes: 09:00 a 20:00.</p>
          <p>Sábados: 09:00 a 18:00.</p>
          <p>Domingos y festivos: cerrado.</p>
        </section>
      </div>
      <p className="mt-6 text-[0.9rem] text-[#506052]">Los datos de contacto y horarios son ficticios y se utilizan como ejemplo académico.</p>
    </>
  );
}
