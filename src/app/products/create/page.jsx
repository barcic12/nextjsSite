"use client";
import Counter from "@/components/Counter";
import { useState, useEffect } from "react";

export default function CreatePage() {
  const [productName, setProductName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [routes, setRoutes] = useState([]);
  const [file, setFile] = useState(null);
  const [count, setCount] = useState(0);

  // Fetch routes when the component mounts
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await upload(e);
  };
  const upload = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", selectedFolder);
    formData.append("productName", productName);
    formData.append("count", count);
    let res = await fetch("/api/product/create", {
      method: "POST",
      body: formData,
    });

    return await res.json();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="py-2">Create a Product</h1>
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Product name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            //required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="routeSelect">
            Select a Folder
          </label>
          <select
            id="routeSelect"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            //required
          >
            <option value="" disabled>
              Select a folder
            </option>
            {routes.length > 0 ? (
              routes.map((route, index) => (
                <option key={index} value={route}>
                  {route}
                </option>
              ))
            ) : (
              <option>No routes available</option>
            )}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 py-2" htmlFor="routeSelect">
            Choose count
          </label>
          <Counter count={count} setCount={setCount} />
        </div>
        <div className="py-5 inline-block">
          <label className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 px-3 py-1 cursor-pointer">
            Choose File
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
              //required
            />
          </label>
          {file && <p>Selected file: {file.name}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Create product
        </button>
      </form>
    </div>
  );
}
