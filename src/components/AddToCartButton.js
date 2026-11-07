"use client";

import { useState } from "react";

export default function AddToCartButton({ productName }) {
  const [count, setCount] = useState(0);
  return (
    <div className="mt-4">
      <button
        onClick={() => setCount(count + 1)}
        className="rounded-3xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Add {productName} to cart
      </button>
      <p className="mt-2">In Cart:{count}</p>
    </div>
  );
}
