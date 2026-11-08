import { useId } from 'react';

export default function CategoryFilter({ categories, value, onChange }) {
  const id = useId();

  return (
    <div className="mb-6 max-w-sm">
      <label className="mb-[0.35rem] block font-[650]" htmlFor={id}>Categoría</label>
      <select
        id={id}
        className="min-h-12 w-full rounded-[0.4rem] border border-[#718477] bg-white p-[0.65rem] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#b45e00]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Todas</option>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>{category.label}</option>
        ))}
      </select>
    </div>
  );
}
