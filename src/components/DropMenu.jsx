"use client";
import { useState } from "react";
import { FaListUl } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import MenuItem from "./MenuItem";
import Link from "next/link";
export default function DropMenu({ title, initAddress, routes }) {
  const [showDropdown, setShowDropdown] = useState(false);
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
        className={`absolute left-0 w-64 p-4 text-blue-600 bg-red-300 rounded-lg shadow-lg z-10 transition-all duration-300 ${
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
              <div className="flex items-center">
                <IoMdCheckboxOutline />
                <p className="px-2">{route}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
