import { useState } from 'react';
import { useInventory } from '../context/InventoryContext.jsx';

const emptyForm = { name: '', brand: '', type: '' };
const fields = [
  { name: 'name', label: 'Nombre del producto', placeholder: 'Ej.: Leche entera' },
  { name: 'brand', label: 'Marca', placeholder: 'Ej.: Campo Verde' },
  { name: 'type', label: 'Tipo de producto', placeholder: 'Ej.: Lácteos' },
];

export default function ProductForm() {
  const { dispatch } = useInventory();
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setConfirmation('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const product = {
      name: values.name.trim(),
      brand: values.brand.trim(),
      type: values.type.trim(),
    };
    const nextErrors = {};
    for (const field of fields) {
      if (!product[field.name]) {
        nextErrors[field.name] = `${field.label}: ingresa un valor que no contenga solo espacios.`;
      }
    }
    setErrors(nextErrors);
    setConfirmation('');
    if (Object.keys(nextErrors).length > 0) return;

    dispatch({ type: 'ADD_PRODUCT', payload: { id: crypto.randomUUID(), ...product } });
    setValues(emptyForm);
    setConfirmation(`Producto «${product.name}» registrado correctamente.`);
  }

  return (
    <form className="rounded-xl border border-[#d9e1d6] bg-white p-6 [&>h2]:mt-0 [&>h3]:mt-0 mt-6 max-w-[640px]" onSubmit={handleSubmit} noValidate>
      <p>Todos los campos son obligatorios.</p>
      {fields.map((field) => (
        <div className="mb-5" key={field.name}>
          <label className="mb-[0.35rem] block font-[650]" htmlFor={`product-${field.name}`}>{field.label}</label>
          <input
            className="min-h-12 w-full rounded-[0.4rem] border border-[#718477] bg-white p-[0.65rem] aria-invalid:border-[#a52b24] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#b45e00]"
            id={`product-${field.name}`}
            name={field.name}
            type="text"
            value={values[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
          />
          {errors[field.name] && (
            <p id={`${field.name}-error`} className="mt-[0.35rem] mb-0 text-[0.9rem] text-[#a52b24]" role="alert">
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}
      <button className="cursor-pointer inline-block rounded-lg border-0 bg-[#17633f] px-[1.1rem] py-[0.7rem] font-[650] text-white no-underline hover:bg-[#10482d] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#b45e00]" type="submit">Registrar producto</button>
      <p className="mt-4 mb-0 font-[650] text-[#17633f] empty:m-0" role="status">{confirmation}</p>
    </form>
  );
}
