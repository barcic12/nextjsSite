import Link from "next/link";
import { useState } from "react";
export default function FillingForm({
  listOfLineParameters,
  handleSubmit,
  title,
  buttonTitle,
  links,
}) {
  const [Response, setResponse] = useState("");
  const localHandleSubmit = async (e) => {
    try {
      e.preventDefault();
      setResponse("");

      const response = await handleSubmit(e);
      let result = await response.json();
      if (response.ok) {
        result = result.message;
      } else {
      }
    } catch (error) {
      result = error.message;
    }
    setResponse(result);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <form
        onSubmit={localHandleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        {listOfLineParameters.length > 0 &&
          listOfLineParameters.map((line, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-gray-700">{line["label"]}</label>
              <input
                type="text"
                value={line["var"]}
                onChange={(e) => line["setVarFunc"](e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
          ))}
        {Response && <p className="text-red-500 text-sm mb-4">{Response}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {buttonTitle}
        </button>
        {links &&
          links.length > 0 &&
          links.map((link, index) => (
            <div key={index} className="pt-1">
              <Link
                href={link["address"]}
                className="hover:text-amber-500 text-blue-300"
                onClick={link["onClick"] || undefined}
              >
                {link["title"]}
              </Link>
            </div>
          ))}
      </form>
    </div>
  );
}
