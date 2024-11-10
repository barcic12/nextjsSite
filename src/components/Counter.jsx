"use client";
import React, { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count === 0) return;
    setCount(count - 1);
  };
  return (
    <div className="w-full sm:w-32 md:w-48 lg:w-64 h-auto bg-white flex items-center justify-between border rounded-lg px-4 py-2 shadow-sm">
      <button
        onClick={decrement}
        className="text-blue-500 font-semibold text-lg"
      >
        -
      </button>
      <span className="text-lg font-medium">{count}</span>
      <button
        onClick={increment}
        className="text-blue-500 font-semibold text-lg"
      >
        +
      </button>
    </div>
  );
}