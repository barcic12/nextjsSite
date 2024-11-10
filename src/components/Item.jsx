// src/components/Item.jsx
import Counter from "./Counter";
export default function Item({ imagePath, title, description }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <h1 className="bg-[#fee2e2] rounded-full">{title}</h1>
      <img
        className="w-64 h-64 object-cover"
        src={imagePath || undefined}
        alt={description || undefined}
      />
      <Counter />
      <button className="text-blue-500 font-semibold text-lg bg-white w-full sm:w-32 md:w-48 lg:w-64 h-auto border rounded-lg px-4 py-2 shadow-sm">
        add
      </button>
    </div>
  );
}
