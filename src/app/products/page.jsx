// src/app/items/page.jsx
"use client";
import Item from "@/components/Item";
import { useState, useEffect } from "react";
export default function ItemsPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch("/api/product/getDetails");
        const data = await response.json(); // Parse the JSON response
        setProducts(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDetails();
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-center min-h-screen bg-[#cffafe] gap-3 py-6">
      {products.length > 0 &&
        products.map(
          (product) =>
            product.quantityInStock > 0 && (
              <Item
                imagePath={product.imagePath}
                title={product.name}
                maxAmount={product.quantityInStock}
              />
            )
        )}
    </div>
  );
}
