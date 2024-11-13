// src/components/Item.jsx
"use client";
import React, { useState } from "react";
import Counter from "./Counter";
export default function Item({
  imagePath,
  title,
  description,
  maxAmount,
  price,
}) {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center gap-1">
      <h1 className="bg-[#fee2e2] rounded-full">{title}</h1>
      <img
        className="w-64 h-64 object-cover"
        src={imagePath || undefined}
        alt={description || undefined}
      />
      <p className="text-xl">{`${price}\u20AA`}</p>
      <Counter count={count} setCount={setCount} maxAmount={maxAmount} />
      <button className="text-blue-500 font-semibold text-lg bg-white w-full sm:w-32 md:w-48 lg:w-64 h-auto border rounded-lg px-4 py-2 shadow-sm">
        add
      </button>
    </div>
  );
}
