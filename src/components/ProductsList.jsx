"use client";
import Item from "@/components/Item";
import { useState, useEffect } from "react";
export default function ProductsList({ type }) {
  const [products, setProducts] = useState([]);
  const fetchDetails = async () => {
    try {
      const response = await fetch("/api/product/getDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: type || undefined }),
      });
      const data = await response.json(); // Parse the JSON response
      setProducts(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-center min-h-screen bg-[#cffafe] gap-3 py-6">
      {products.length > 0 &&
        products.map(
          (product, index) =>
            product.quantityInStock > 0 && (
              <Item
                key={index}
                imagePath={product.imagePath}
                title={product.name}
                maxAmount={product.quantityInStock}
                price={product.price}
              />
            )
        )}
    </div>
  );
}
