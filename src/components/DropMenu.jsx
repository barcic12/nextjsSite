"use client";
import { useState, useEffect } from "react";
import { FaListUl } from "react-icons/fa";
import MenuItem from "./MenuItem";
import Link from "next/link";
export default function DropMenu({ title, initAddress }) {
  const [routes, setRoutes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("/api/product/create");
        const data = await response.json(); // Parse the JSON response
        setRoutes(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRoutes();
  }, []);
  return (
    <div
      className="relative bg-green-100 rounded-full"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="hover:text-amber-300 cursor-pointer">
        <MenuItem
          title={title}
          address={initAddress}
          Icon={FaListUl}
        ></MenuItem>
      </div>
      <div
        className={`absolute left-0 w-64 p-4 bg-white rounded-lg shadow-lg z-10 transition-all duration-300 ${
          showDropdown ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        {routes.length > 0 &&
          routes.map((route, index) => (
            <Link
              key={index}
              href={initAddress ? `${initAddress}/${route}` : undefined}
              className="hover:text-amber-300"
            >
              <p className="">{route}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
