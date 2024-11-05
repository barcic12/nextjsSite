"use client";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
export default function DropMenu({ title }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [textValue, setTextValue] = useState("");
  return (
    <div className="relative bg-green-100 rounded-full">
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="hover:text-amber-300"
      >
        <FaQuestionCircle className="text-2xl sm:hidden" />
        <p className="hidden sm:inline text-sm">{title}</p>
      </div>
      {showDropdown && (
        <div className="absolute left-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg z-10">
          <textarea
            rows="3"
            onChange={(e) => setTextValue(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your question here..."
          ></textarea>
          <button
            onClick={() => alert("Question submitted")}
            className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
